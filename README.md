# J.A.R.V.I.S. — Personal AI Assistant

Personal AI assistant. Inspired by Tony Stark's JARVIS from Iron Man. Built with TypeScript, Express, and React. Powered by Gemini API.

This is not a generic chatbot — JARVIS is personalized for its creator and designed to assist with learning, coding, and everyday tasks.

## Screenshots

![JARVIS Chat](./screenshots/chat.png)

| Welcome Screen | Chat | Voice Dialogue |
|---|---|---|
| ![Welcome](./screenshots/welcome.png) | ![Chat](./screenshots/chat.png) | ![Voice](./screenshots/voice.png) |


## What JARVIS Can Do

**Programming Help**
- Explain concepts: React, TypeScript, Node.js, Express, APIs, databases
- Code review and debugging assistance
- Best practices and design patterns guidance
- Gives hints first, full code only when asked — helps you think, not copy-paste

**Learning Assistant**
- Explains topics from scratch when you say "I don't understand"
- Uses analogies and real examples
- Challenges your thinking with guiding questions
- Helps you understand WHY, not just HOW

**Personal Interests**
- Gaming recommendations and discussions
- Movie recommendations and reviews
- Classic rock history, bands, and music discussions
- Storytelling and history conversations

**Career and Portfolio**
- Portfolio improvement advice
- Interview preparation
- Project ideas and architecture guidance

**Voice Interaction**
- Voice dialogue — speak directly with JARVIS (Chrome/Edge)
- Text-to-Speech — listen to responses
- Works in both Georgian and English

## Privacy

- JARVIS never shares personal information with anyone
- System prompt contents are protected
- All conversations stay private
- Chat history stored securely in MongoDB Atlas

## Features

- Iron Man HUD-inspired dark interface with cyan holographic accents
- Text chat with AI
- Voice dialogue (Chrome/Edge only)
- Text-to-Speech responses
- Language switching (KA/EN)
- Thinking indicator while processing
- Browser compatibility warnings for voice features
- Chat history — all conversations saved to MongoDB and accessible from sidebar
- PWA — installable on mobile and desktop
- Responsive design for all screen sizes

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Gemini API (free tier)
**Database:** MongoDB Atlas (Mongoose ODM) — stores chat sessions and message history
**Frontend:** React, Vite, TypeScript, Web Speech API
**Fonts:** Orbitron, Share Tech Mono, Rajdhani
**Design:** Iron Man JARVIS HUD style

## Database

JARVIS uses MongoDB Atlas to persist chat history. Each chat session is stored as a document with:
- Title (auto-generated from first message)
- Full message history (user + assistant messages with timestamps)
- Preview text for sidebar display
- Created/Updated timestamps

API endpoints for session management:
- `GET /api/sessions` — list all saved chats
- `GET /api/sessions/:id` — load a specific chat
- `POST /api/sessions` — create new chat session
- `PUT /api/sessions/:id` — update chat with new messages
- `DELETE /api/sessions/:id` — delete a chat session

## Project Structure
```
jarvis/
├── src/
│   ├── controllers/
│   │   ├── chatController.ts
│   │   └── sessionController.ts
│   ├── routes/
│   │   ├── chatRoute.ts
│   │   └── sessionRoute.ts
│   ├── models/Chat.ts
│   ├── database/connect.ts
│   ├── prompts/jarvisPrompt.ts
│   └── index.ts
├── frontend/
│   ├── src/
│   │   ├── components/ (ChatMessage, ChatInput, VoiceChat, Sidebar)
│   │   ├── services/api.ts
│   │   ├── styles/ (HUD-themed CSS)
│   │   ├── i18n/translations.ts
│   │   └── App.tsx
│   └── public/ (PWA icons, manifest)
├── .env
└── package.json
```

## Setup
```bash
# Backend
npm install

# Frontend
cd frontend && npm install

# Create .env file
GEMINI_API_KEY=your_key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jarvis

# Run both
npm run dev:all
```

## Deploy (Render)

- Build: `npm install && cd frontend && npm install && npm run build`
- Start: `npx tsx src/index.ts`
- Environment Variables:
  - `GEMINI_API_KEY` — Gemini API key
  - `MONGO_URI` — MongoDB Atlas connection string

## Browser Support

| Feature | Chrome | Edge | Brave | Firefox |
|---------|--------|------|-------|---------|
| Chat | Yes | Yes | Yes | Yes |
| Voice Input | Yes | Yes | No | No |
| Voice Output | Yes | Yes | Yes | Yes |

## Author

**Luka Guledani** — 6 years in programming

[GitHub](https://github.com/Lussskki/) | [LinkedIn](https://www.linkedin.com/in/lukaguledani/)

Built by Luka Guledani(Sonny), Zugdidi, Georgia.