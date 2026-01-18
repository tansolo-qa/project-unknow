
export const DEMO_SCENARIOS = {
    e2e: {
        command: "npx playwright test",
        logs: [
            "Running 5 tests using 5 workers",
            "",
            "  [chromium] › tests/tdm/generator.spec.ts:7:5 › UI: Should generate Product data",
            "  [chromium] › tests/tdm/generator.spec.ts:25:5 › UI: Manual Creation Form",
            "  [chromium] › tests/tdm/generator.spec.ts:45:5 › API: POST /api/data/generate",
            "  [chromium] › tests/checkout.spec.ts:12:5 › UI: Checkout Flow (Happy Path)",
            "  [chromium] › tests/visual.spec.ts:8:5 › Visual: Check Homepage Snapshot",
            "",
            "  ✓  1 passed (1.2s)",
            "  ✓  2 passed (2.1s)",
            "  ✓  3 passed (2.5s)",
            "  ✓  4 passed (3.2s)",
            "  ✓  5 passed (3.8s)",
            "",
            "  ✨  5 passed (4.1s)",
            "  Report generated at playwright-report/index.html"
        ]
    },
    load: {
        command: "k6 run scripts/load-test.js",
        logs: [
            "          /\\      |‾‾| /‾‾/   /‾‾/   ",
            "     /\\  /  \\     |  |/  /   /  /    ",
            "    /  \\/    \\    |     (   /   ‾‾\\  ",
            "   /          \\   |  |\\  \\ |  (‾)  | ",
            "  / __________ \\  |__| \\__\\ \\_____/ .io",
            "",
            "  execution: local",
            "     script: scripts/load-test.js",
            "     output: -",
            "",
            "  scenarios: (100.00%) 1 scenario, 50 max VUs, 1m30s max duration (incl. graceful stop):",
            "           * default: Up to 50 looping VUs for 1m30s (gracefulStop: 30s)",
            "",
            "running (0m10.0s), 10/50 VUs, 245 iterations",
            "running (0m30.0s), 50/50 VUs, 1502 iterations",
            "running (0m50.0s), 50/50 VUs, 3400 iterations",
            "",
            "     ✓ status is 200",
            "     ✓ protocol is HTTP/2",
            "",
            "     checks.........................: 100.00% ✓ 6800       ✗ 0",
            "     data_received..................: 5.4 MB  108 kB/s",
            "     data_sent......................: 1.2 MB  24 kB/s",
            "     http_req_duration..............: avg=220.14ms min=115.4ms med=210.5ms max=1.01s p(95)=300.2ms",
            "     http_req_failed................: 0.00%   ✓ 0          ✗ 3400",
            "     iterations.....................: 3400    66.66666/s",
            "     vus............................: 1       min=1        max=50",
            "     vus_max........................: 50      min=50       max=50"
        ]
    }
}
