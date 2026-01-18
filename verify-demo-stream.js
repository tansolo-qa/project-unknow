const http = require('http');

const url = 'http://localhost:3000/api/run-demo?type=e2e';

console.log(`Checking stream from: ${url}`);

http.get(url, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);

    res.setEncoding('utf8');
    let chunkCount = 0;
    let totalData = '';

    res.on('data', (chunk) => {
        chunkCount++;
        totalData += chunk;
        process.stdout.write(`[Chunk ${chunkCount}] Received ${chunk.length} bytes\n`);
        // Print first few chars of chunk to see content
        console.log(`   Content preview: ${chunk.substring(0, 50).replace(/\n/g, '\\n')}...`);
    });

    res.on('end', () => {
        console.log('\nStream ended.');
        console.log(`Total Chunks: ${chunkCount}`);
        console.log(`Total Size: ${totalData.length} bytes`);

        // Validation
        const hasTestSuites = totalData.includes('Test Suites');
        const hasPass = totalData.includes('PASS');

        if (chunkCount > 1 && (hasTestSuites || hasPass)) {
            console.log('✅ VERIFICATION PASSED: Received multiple chunks and valid test output.');
            process.exit(0);
        } else {
            console.error('❌ VERIFICATION FAILED: Did not receive expected stream or content.');
            console.log('Full Output:\n', totalData);
            process.exit(1);
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
