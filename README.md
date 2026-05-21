# FinSight — Frontend

> AI-powered personal finance tracker. Track income, expenses, and investments with intelligent insights powered by OpenAI.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://finsight-frontend-ten.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)

---

## Live Demo

**Frontend:** https://finsight-frontend-ten.vercel.app  
**Backend API:** https://finsight-backend.onrender.com

---

## Features

- **Dashboard** — Overview of income, expenses, investments, and net balance with charts
- **Transactions** — Full CRUD with category tagging, filters, and search
- **AI Insights** — GPT-powered financial analysis by period (week / month / year) and by category
- **Authentication** — Secure login and registration with JWT via httpOnly cookies
- **Profile** — Update personal details and change password

---

## Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Framework     | React 19 + TypeScript 6        |
| Build tool    | Vite 8                         |
| Styling       | Tailwind CSS 4                 |
| Routing       | React Router DOM 7             |
| Data fetching | TanStack Query (React Query) 5 |
| Forms         | React Hook Form + Zod          |
| HTTP client   | Axios                          |
| Charts        | Recharts                       |
| Icons         | Lucide React                   |
| Notifications | React Hot Toast                |
| Analytics     | Vercel Analytics               |

---

## Project Structure

```
src/
├── api/                  # Axios API functions
│   ├── auth.api.ts
│   ├── client.ts         # Axios instance with interceptors
│   ├── insight.api.ts
│   ├── transaction.api.ts
│   └── user.api.ts
├── components/           # Shared components
├── constants/
│   ├── enums.ts          # TransactionType, Category enums + API URLs
│   ├── queryKeys.ts      # TanStack Query key factory
│   └── routes.ts         # Route path constants
├── contexts/
│   └── AuthContext.tsx   # Auth state, login, logout, updateUser
├── hooks/
│   ├── useAuth.ts
│   └── queries/
│       └── useOverviewHooks.ts   # useInsights, useCategoryInsights, etc.
├── layouts/
│   └── DashboardLayout.tsx       # Sidebar + topbar shell
├── pages/
│   ├── HomePage.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── dashboard/
│   │   ├── Overview.tsx
│   │   ├── Transactions.tsx
│   │   ├── Insights.tsx
│   │   └── Profile.tsx
│   └── NotFound.tsx
├── types/                # TypeScript interfaces and types
│   ├── auth.types.ts
│   ├── insight.types.ts
│   ├── transaction.types.ts
│   └── user.types.ts
└── main.tsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- The [FinSight backend](https://github.com/titas1803/finsight-backend) running locally or deployed

### Installation

```bash
# Clone the repo
git clone https://github.com/titas1803/finsight-frontend.git
cd finsight-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_API_URL=http://localhost:3000
```

For production (Vercel), set:

```env
VITE_API_URL=https://finsight-backend.onrender.com
```

### Running locally

```bash
# Start dev server
npm run dev
```

App runs at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output goes to `dist/`.

---

## Authentication

Auth is handled via **httpOnly cookies** — no tokens are stored in `localStorage`. The Axios client (`src/api/client.ts`) is configured with `withCredentials: true` globally.

On a 401 response, the interceptor automatically:

1. Calls `POST /auth/refresh-tokens` to get a new access token
2. Retries the original request
3. Queues any concurrent requests during the refresh
4. Redirects to `/login` on refresh failure

---

## Color System

All colors are hardcoded (no Tailwind config tokens):

| Token          | Value     | Usage                  |
| -------------- | --------- | ---------------------- |
| `background`   | `#0F1117` | Page background        |
| `surface`      | `#1A1D27` | Cards, panels          |
| `border`       | `#2A2D3E` | Borders, dividers      |
| `primary`      | `#6C63FF` | Buttons, accents       |
| `income`       | `#22C55E` | Income values          |
| `expense`      | `#EF4444` | Expense values         |
| `investment`   | `#F59E0B` | Investment values      |
| `text-primary` | `#F1F5F9` | Headings, primary text |
| `text-muted`   | `#64748B` | Labels, secondary text |

---

## Deployment

The app is deployed on **Vercel** with automatic deploys on every push to `main`.

### Manual deploy steps

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set environment variable `VITE_API_URL`
4. Add `vercel.json` to the repo root for SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Backend

The backend repository is at [github.com/titas1803/finsight-backend](https://github.com/titas1803/finsight-backend).

Built with NestJS + PostgreSQL (Neon) + Redis (Upstash) + OpenAI.

---

## License

MIT
