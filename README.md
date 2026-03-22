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

## Features

- Iron Man HUD-inspired dark interface with cyan holographic accents
- Text chat with AI
- Voice dialogue (Chrome/Edge only)
- Text-to-Speech responses
- Language switching (KA/EN)
- Thinking indicator while processing
- Browser compatibility warnings for voice features
- PWA — installable on mobile and desktop
- Responsive design for all screen sizes

## Tech Stack

**Backend:** Node.js, Express, TypeScript, Gemini API (free tier)
**Frontend:** React, Vite, TypeScript, Web Speech API
**Fonts:** Orbitron, Share Tech Mono, Rajdhani
**Design:** Iron Man JARVIS HUD style

## Project Structure
```
jarvis/
├── src/
│   ├── controllers/chatController.ts
│   ├── routes/chatRoute.ts
│   ├── prompts/jarvisPrompt.ts
│   └── index.ts
├── frontend/
│   ├── src/
│   │   ├── components/ (ChatMessage, ChatInput, VoiceChat)
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

# Add API key
# Create .env file: GEMINI_API_KEY=your_key

# Run both
npm run dev:all
```

## Deploy (Render)

- Build: `npm install && cd frontend && npm install && npm run build`
- Start: `npx tsx src/index.ts`
- Env: `GEMINI_API_KEY`

## Browser Support

| Feature | Chrome | Edge | Brave | Firefox |
|---------|--------|------|-------|---------|
| Chat | Yes | Yes | Yes | Yes |
| Voice Input | Yes | Yes | No | No |
| Voice Output | Yes | Yes | Yes | Yes |

## Author

**Luka Guledani** — Junior Developer, 6 years in programming

[GitHub](https://github.com/Lussskki/) | [LinkedIn](https://www.linkedin.com/in/lukaguledani/)

Built by Luka Guledani(Sonny), Zugdidi, Georgia.