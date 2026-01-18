# Project C: Performance Testing with k6

This project demonstrates a modern Load Testing stack using **k6**, **InfluxDB**, and **Grafana**.

## Architecture
- **k6**: Generates load and streams metrics.
- **InfluxDB**: Stores real-time metrics.
- **Grafana**: Visualizes performance data.

## Prerequisites
- Docker & Docker Compose installed.

## How to Run

1.  **Start Infrastructure**:
    ```bash
    docker-compose up -d influxdb grafana
    ```

2.  **Run Load Test**:
    ```bash
    docker-compose run --rm k6 run /scripts/load-test.js
    ```

3.  **View Dashboard**:
    - Open [http://localhost:3000](http://localhost:3000)
    - Configure InfluxDB datasource (URL: `http://influxdb:8086`, Database: `k6`)
    - Import k6 Dashboard ID: `2587` (Official k6 Dashboard)
