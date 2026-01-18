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
            args: ['playwright', 'test', 'tests/tdm/generator.spec.ts', '--project=chromium'],
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
            // Spawn the process
            const child = spawn(config.cmd, config.args, {
                cwd: config.cwd,
                shell: true, // Use shell to ensure command is found
                env: { ...process.env, FORCE_COLOR: '1' } // Force color output if possible (might need handling on FE)
            });

            const sendLog = (data: Buffer | string) => {
                const text = data.toString();
                // Send each line as a separate chunk for easier FE handling
                controller.enqueue(encoder.encode(text));
            };

            child.stdout.on('data', sendLog);
            child.stderr.on('data', sendLog);

            child.on('close', (code) => {
                const msg = code === 0
                    ? '\n✨ Demo Sequence Completed Successfully\n'
                    : `\n❌ Process exited with code ${code}\n`;

                controller.enqueue(encoder.encode(msg));
                controller.close();
            });

            child.on('error', (err) => {
                controller.enqueue(encoder.encode(`Error starting process: ${err.message}\n`));
                controller.close();
            });
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
