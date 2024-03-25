#  Rest Service

## Steps to get started:
1. Clone repository from dev2 branch
2. Install dependencies with `npm i`
3. Create `.env` file _(./.env)_ based on example from `.env.example`

### Running with Docker
1. Install and execute [Docker Desktop](https://docs.docker.com/engine/install/)  
2. Execute command `docker-compose up --build`

### Running without Docker
_If you haven't encountered any issues with Docker, you can skip this step_

1. Install [Postgres](https://www.postgresql.org/download/)
2. Create a database with name `rs-node-2024q1-nest` (use PostgreSQL 16).
3. Apply migrations `npm run migration:update`
4. Start the server `npm start`\
---
## Testing:

Run the tests:
```
npm run test
```

---
## Format:
```
npm run lint
```