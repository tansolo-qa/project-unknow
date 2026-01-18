import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

// Force dynamic to allow streaming
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');

    if (!type || !['e2e', 'load', 'api'].includes(type)) {
        return new NextResponse('Invalid demo type', { status: 400 });
    }

    const encoder = new TextEncoder();

    // Define commands map
    const commands: Record<string, { cmd: string, args: string[], cwd?: string }> = {
        e2e: {
            cmd: 'npx.cmd', // Windows specific: use npx.cmd
            args: ['playwright', 'test', '--project=chromium'],
            cwd: 'projects/e2e-automation'
        },
        load: {
            cmd: 'docker-compose',
            args: ['run', '--rm', 'k6', 'run', '/scripts/tdm-load-test.js'],
            cwd: 'projects/performance-load-testing'
        },
        api: {
            cmd: 'npm.cmd',
            args: ['test'],
            cwd: 'projects/api-contract-testing'
        }
    };

    const config = commands[type];

    // Create a streaming response
    const stream = new ReadableStream({
        start(controller) {
            const config = commands[type];
            // Spawn the process
            const child = spawn(config.cmd, config.args, {
                cwd: config.cwd,
                shell: true, // Use shell to ensure command is found
                env: { ...process.env, FORCE_COLOR: '1' } // Force color output if possible
            });

            const sendLog = (data: Buffer | string) => {
                try {
                    const text = data.toString();
                    controller.enqueue(encoder.encode(text));
                } catch (err) {
                    // Controller already closed, ignore
                }
            };

            child.stdout.on('data', sendLog);
            child.stderr.on('data', sendLog);

            child.on('close', (code) => {
                try {
                    const msg = code === 0
                        ? '\n✨ Demo Sequence Completed Successfully\n'
                        : `\n❌ Process exited with code ${code}\n`;

                    controller.enqueue(encoder.encode(msg));
                    controller.close();
                } catch (err) {
                    // Ignore if already closed
                }
            });

            child.on('error', (err) => {
                try {
                    controller.enqueue(encoder.encode(`Error starting process: ${err.message}\n`));
                    controller.close();
                } catch (e) { }
            });

            // Store child reference for cleanup
            (controller as any).child = child;
        },
        cancel(controller) {
            // Clean up process if client disconnects
            if ((controller as any).child) {
                try {
                    ((controller as any).child).kill();
                } catch (e) { }
            }
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
