# CediNook

CediNook is an offline-first personal finance and savings tracker that you can install on your phone. All amounts are entered by you — it never connects to bank accounts or wallets, reads messages, or moves money.

## What it does
- Savings goals with progress, deadlines and an Ahead / On track / Behind status.
- Daily income and expense tracking with search, filters, editing, duplicate warnings and manual recurring reminders. Budgets, bills, debts, assets and accounts (including mobile money, cash and bank accounts).
- Dashboard with monthly summaries, bill and category-budget alerts, and a backup reminder. JSON restore includes a contents preview before replacing local data.
- Reports, a savings coach, a planner and a financial health centre.
- Optional PIN lock. Your data stays on this device in the app. The included server API supports optional encrypted cloud snapshots when configured, but this app build has no in-app cloud account or sync controls. Export a backup from Settings at any time.

## Install on a phone
CediNook is a Progressive Web App. Deploy this folder to an HTTPS host, then:
- **Android (Chrome):** open the address, use **Install app** in the page or Chrome menu → **Install app**.
- **iPhone (Safari):** **Share** → **Add to Home Screen** → **Add**.

A ZIP opened directly from disk (`file://`) can be used in a browser but cannot be installed as an app.

## Run locally
1. Install Node.js 20 or later.
2. `npm install`
3. `npm start`
4. Open `http://localhost:3000`

## Tests
`npm test`
