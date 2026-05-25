# Quartz-Ai

Quartz-Ai is a real-time collaborative system design workspace. It allows users to describe systems in natural language, while an AI agent maps the architecture on a shared canvas. Collaborators can refine the design in real-time and generate professional technical specifications from the resulting graph.

## 🚀 Key Features

- **Collaborative Canvas**: Real-time shared workspace using Liveblocks and React Flow.
- **AI Architecture Generation**: Generate system designs from natural language prompts using AI agents.
- **Starter Templates**: A library of prebuilt system design patterns (monolith, microservices, serverless, etc.).
- **Spec Generation**: Automatically convert your canvas graph into a professional Markdown technical specification.
- **Project Management**: Create, manage, and share architecture projects with collaborators.
- **Live Presence**: Multi-user cursors and presence indicators for seamless teamwork.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Real-time Collaboration**: [Liveblocks](https://liveblocks.io/)
- **Canvas Engine**: [React Flow](https://reactflow.dev/) (@xyflow/react)
- **Database & ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Authentication**: [Clerk](https://clerk.com/)
- **AI**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Background Tasks**: [Trigger.dev](https://trigger.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Radix UI & [shadcn/ui](https://ui.shadcn.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL database
- Clerk Account
- Liveblocks Account
- Trigger.dev Account
- Google / OpenRouter API Key for AI features

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ghost_ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://..."

   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
   CLERK_SECRET_KEY=sk_...

   # Liveblocks
   LIVEBLOCKS_SECRET_KEY=sk_...

   # Trigger.dev
   TRIGGER_SECRET_KEY=tr_...

   # AI Providers
   GOOGLE_GENERATIVE_AI_API_KEY=...
   # or
   OPENROUTER_API_KEY=...
   ```

4. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Run Trigger.dev worker**:
   ```bash
   npx trigger.dev@latest dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Project Structure

- `app/`: Next.js application routes and API endpoints.
- `components/`: Reusable UI components and editor-specific logic.
- `context/`: Project documentation and feature specifications.
- `hooks/`: Custom React hooks for canvas and project actions.
- `lib/`: Shared utility functions and client initializations (Prisma, Liveblocks).
- `prisma/`: Database schema and migrations.
- `trigger/`: Background task definitions for AI generation.
- `types/`: TypeScript type definitions.

## 📜 License

This project is private and proprietary.
