# CV Reviewer

AI-powered CV review platform that allows users to upload resumes, receive automated reviews, and upgrade to a Pro plan for unlimited usage.

## Features

- User Authentication
- Resume Upload
- Resume Content Extraction
- AI Resume Review
- Resume History
- Free Plan (1 Resume)
- Pro Plan (Unlimited Resumes)
- Stripe Subscription Payments
- Protected Routes
- Responsive UI

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Query

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Payments

- Stripe Checkout
- Stripe Webhooks

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Reem99-sina/Review_cv.git

cd cv-reviewer
```

### 2. Install Dependencies

```bash
npm install
```

---

## Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run Migrations:

```bash
npx prisma migrate dev
```

Start Prisma Studio:

```bash
npx prisma studio
```

---

## Run Development Server

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

## Subscription Plans

### Free

- 1 Resume Upload
- AI Review
- Resume History

### Pro

- Unlimited Resume Uploads
- Unlimited Reviews
- Future Premium Features

---

## Stripe Setup

### Create Checkout Session

```http
POST /api/checkout
```

### Stripe Webhook

```http
POST /api/stripe/webhook
```

Webhook events:

```text
checkout.session.completed
```

When payment succeeds:

```text
User plan -> PRO
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
```

### Resume

```http
POST /api/resume/upload
GET  /api/resume/history
```

### Review

```http
GET /api/review/:id
```

### Payments

```http
POST /api/checkout
POST /api/stripe/webhook
```

---

## Project Structure

```text
app/
├── api/
├── login/
├── register/
├── history/
├── pricing/
├── review/
└── success/

components/
hooks/
lib/
prisma/
types/
```

---

## Deployment

Recommended:

- Vercel
- Neon PostgreSQL
- Stripe

Build:

```bash
npm run build
```

---

## Future Improvements

- Stripe Customer Portal
- Subscription Cancellation
- Yearly Plans
- Team Accounts
- Resume Templates
- Cover Letter Generator

---

## License

MIT