# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thoughtstream** is a lightweight notes application designed for users who take frequent notes while working with LLMs. The app provides a clean interface for creating, editing, and organizing notes with automatic timestamping.

### Application Architecture

This project will be structured as a full-stack application with two main components:

- **UI (Frontend)**: React-based web interface with tabbed note management
- **Backend**: TypeScript/Node.js API server with Redis data storage

### Key Features

- **Auto-titled notes**: New notes automatically get titles with current date/timestamp
- **Tabbed interface**: Sidebar with tabs for switching between open notes
- **Real-time editing**: Seamless note creation and editing experience
- **Future-ready auth**: Prepared for SIWE (Sign-In with Ethereum) authentication

## Development Commands

- **Start full application**: `npm run dev` (runs both frontend and backend concurrently)
- **Start backend only**: `npm run backend:dev`
- **Start frontend only**: `npm run ui:dev`
- **Install all dependencies**: `npm install` (installs root deps), then run install in both `backend/` and `ui/` directories
- **Type checking**: `npm run backend:typecheck && npm run ui:typecheck`
- **Build for production**: `npm run build`

## Project Structure

```
thoughtstream/
├── backend/          # TypeScript API server
│   ├── src/         # Source code
│   ├── package.json # Backend dependencies
│   └── tsconfig.json
├── ui/              # React frontend
│   ├── src/         # React components and logic
│   ├── package.json # Frontend dependencies
│   └── vite.config.ts
├── TODO.md          # Comprehensive task list for implementation
└── CLAUDE.md        # This file
```

## Technology Stack

### Frontend
- **React 18**: UI framework with TypeScript
- **Vite**: Build tool and development server
- **CSS Modules or Styled Components**: For styling

### Backend
- **Node.js + Express**: API server framework
- **TypeScript**: Type-safe server development
- **Redis**: Fast data storage for notes
- **CORS**: Cross-origin request handling

### Future Authentication
- **SIWE (Sign-In with Ethereum)**: Planned authentication system
- **Wallet integration**: For decentralized user identification

## Development Workflow

1. **Task Management**: All implementation tasks are tracked in `TODO.md`
2. **Incremental Development**: Backend API first, then frontend integration
3. **No Authentication Initially**: Start without auth, prepare for SIWE later
4. **Redis Setup**: Ensure Redis server is running for data persistence

## Current Status

✅ **MVP Implementation Complete**: The core notes application has been implemented with all primary features:

- **Backend API**: Express.js server with Redis storage, full CRUD operations for notes
- **Frontend UI**: React application with tabbed sidebar, note editor, auto-save functionality
- **Auto-titled notes**: New notes get automatic timestamps as titles
- **Development setup**: Concurrent development scripts for full-stack development

### Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   cd backend && npm install
   cd ../ui && npm install
   ```

2. **Ensure Redis is running**: The app connects to Redis using the URL in `.env`

3. **Start the application**: `npm run dev`
   - Backend runs on http://localhost:3001
   - Frontend runs on http://localhost:5173
   - API calls are proxied from frontend to backend

### Remaining Tasks

Refer to `TODO.md` for additional features like SIWE authentication, advanced search, and production deployment configurations.