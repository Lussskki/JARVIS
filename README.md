# JARVIS — Personal AI Assistant

Personal AI assistant built with TypeScript, Express, and React. Powered by Gemini API.

## Features

- Text chat with AI
- Voice dialogue (Chrome/Edge)
- Text-to-Speech responses
- Language switching (KA/EN)
- Custom system prompt personalized for the creator
- PWA — installable on mobile and desktop

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Gemini API
**Frontend:** React, Vite, TypeScript, Web Speech API

## Setup

```bash
# Backend
npm install

# Frontend
cd frontend && npm install

# Add API key
# Create .env file: GEMINI_API_KEY=your_key

# Run both
npm run dev:all
```

## Deploy (Render)

- Build: `npm install && cd frontend && npm install && npm run build`
- Start: `npx tsx src/index.ts`
- Env: `GEMINI_API_KEY`

## Author

**Luka Guledani** — [GitHub](https://github.com/Lussskki/) | [LinkedIn](https://www.linkedin.com/in/lukaguledani/)
