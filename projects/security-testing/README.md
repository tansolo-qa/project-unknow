# 🛡️ Project S: Security & Penetration Testing

Dedicated security auditing and penetration testing suite ("The Guardian").
This project automates **DAST (Dynamic Application Security Testing)** using OWASP ZAP to find vulnerabilities in our applications.

## 🎯 Objectives
- **Automated Pen Testing**: Run passive/active scans against TDM and Portfolio.
- **Vulnerability Reporting**: Generate HTML/JSON reports on security risks.
- **CI/CD Integration**: Fail builds on High/Critical alerts.

## 🛠️ Stack
- **Engine**: [OWASP ZAP (Zed Attack Proxy)](https://www.zaproxy.org/) - Dockerized
- **Type**: DAST (Black-box testing)
- **Targets**:
  - Test Data Manager (`http://localhost:3001`)

## 🚀 How to Run (Windows/Docker)

```bash
# 1. Start target application (TDM)
npm run dev:tdm

# 2. Run ZAP Baseline Scan via Docker Compose
docker-compose run --rm zap-baseline
```

## 📊 Reports
Reports are generated in `./reports`:
- `zap-report.html`: Human-readable summary
- `zap-report.json`: Machine-parsable data
