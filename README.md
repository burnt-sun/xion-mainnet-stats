# Xion Launch Analytics Dashboard

A real-time analytics dashboard for monitoring the Xion Network launch metrics, built with Next.js.

## Features

- Real-time monitoring of key wallet balances
- Historical balance tracking with customizable time intervals
- Total holders tracking and visualization
- Interactive time-series charts
- Automatic data refresh

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Charts**: Recharts
- **State Management**: TanStack Query (React Query)
- **API Integration**: Xion Network API

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase service role key

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the dashboard

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── constants/        # Global constants
├── hooks/           # Custom React hooks
├── lib/             # Core utilities
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## License

[MIT License](LICENSE)
