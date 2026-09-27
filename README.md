# Quietlab Events

Event tracking and analytics for upsell offers in Shopify stores. Stores send an event whenever a customer sees or buys an upsell offer; a React dashboard turns those events into per-offer metrics such as conversion rate and average order value.

## Features

- **Event API:** record offer views, purchases and upsells per store, including order ID, line items, purchase value and upsell value
- **Stores:** create and list the Shopify stores being tracked
- **Metrics:** per offer, total visits, purchases, upsells, purchase value, upsell value, total value, average order value and conversion rate, filterable by date range
- **Dashboard:** React and Material UI, with a metrics table, a bar chart and a form to add stores
- **Users:** create, update and delete users, and log in and out

## Tech stack

**Backend:** Node.js · Express · Sequelize · MySQL · express-validator · Docker
**Frontend:** React · Material UI · Chart.js · React Router · Axios

## API

All routes are served under `/api`.

| Method | Route | Purpose |
|---|---|---|
| POST | `/login` · `/createUser` | Log in, create a user |
| GET, PUT, DELETE | `/getUser` · `/updateUser` · `/deleteUser` · `/logout` | Manage users and sessions |
| POST | `/createStore` | Add a store |
| GET | `/getAllStores` | List stores |
| POST, PUT | `/createEvent` · `/updateEvent` | Record or update an offer event |
| GET | `/calculateMetrics` | Aggregate metrics per offer for a date range |

## Getting started

Requires Node.js 16+ and MySQL.

**Backend**

```bash
cd Backend
npm install
```

Copy `Backend/.env.example` to `Backend/.env` and fill it in:

```
DB_NAME=quietlab
DB_USER=your-mysql-user
DB_PASS=your-mysql-password
PORT=5000
```

Put the same database settings in `config/config.json` (used by the migration tool), then create the tables and start the server:

```bash
npx sequelize-cli db:migrate
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm start
```

The dashboard runs on http://localhost:3000 and calls the API at `http://localhost:5000/api` (set in `frontend/src/constants.js`).

## Project structure

```
Backend/
  app.js                 Express server and middleware
  src/modules/events/    Store, event and metrics routes, controllers and services
  src/modules/user/      User and session routes, controllers and services
  migrations/            Users, stores, events and authorization tables
  Dockerfile
frontend/
  src/pages/             Login and dashboard
  src/components/        Metrics table, chart, filters, store form
  src/services/          API clients
```

## Notes

Login currently issues placeholder tokens, so add real token generation before exposing the API publicly.
