# WorkSphere

WorkSphere is a high-trust, high-efficiency marketplace application for professional services. It bridges the gap between freelancers (Workers) and clients through a polished, intuitive interface and AI-powered profile building.

## Features

- **Dashboard**: Real-time analytics and platform metrics.
- **Job Marketplace**: Filterable list of available professional opportunities.
- **AI Profile Builder**: Powered by Google Gemini to help workers create professional profiles.
- **Portfolio Management**: Showcase past work and achievements.
- **Admin Suite**: Comprehensive user management and platform audit logs.
- **Responsive Design**: Fully optimized for mobile and desktop experiences.
- **Design System**: A robust, accessible design system built with Tailwind CSS.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Recharts
- **Animation**: Motion (motion/react)
- **AI**: Google Gemini API (@google/genai)
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+
- NPM

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `GEMINI_API_KEY`: Required for AI Profile Builder features.

## License

MIT
