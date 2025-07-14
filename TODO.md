# TODO: Lightweight Notes App

This file contains all tasks needed to build the lightweight notes app with React frontend and TypeScript backend.

## Project Setup & Structure

### Initial Setup
- [ ] Create project folder structure (`ui/` and `backend/` directories)
- [ ] Initialize package.json for both UI and backend projects
- [ ] Set up TypeScript configuration for backend
- [ ] Set up React project with Vite in UI directory
- [ ] Configure development environment and scripts

### Backend Development

#### Core API Setup
- [ ] Initialize Express.js server with TypeScript
- [ ] Set up Redis connection and client configuration
- [ ] Create middleware for CORS, JSON parsing, and error handling
- [ ] Set up environment configuration (.env file support)

#### Data Models & Storage
- [ ] Design Redis data schema for notes storage
- [ ] Implement Note model/interface (id, title, content, timestamp, userId?)
- [ ] Create Redis utility functions for CRUD operations
- [ ] Implement note ID generation strategy (UUID or timestamp-based)

#### API Endpoints
- [ ] `GET /api/notes` - Retrieve all notes for a user
- [ ] `GET /api/notes/:id` - Retrieve specific note by ID
- [ ] `POST /api/notes` - Create new note
- [ ] `PUT /api/notes/:id` - Update existing note
- [ ] `DELETE /api/notes/:id` - Delete note
- [ ] Add request validation middleware
- [ ] Implement error handling and HTTP status codes

#### Authentication Preparation
- [ ] Design user model structure for future SIWE integration
- [ ] Create middleware structure for authentication (no-op initially)
- [ ] Prepare API endpoints to accept user context
- [ ] Document SIWE integration requirements

### Frontend Development

#### React App Setup
- [ ] Set up React project structure with TypeScript
- [ ] Configure Vite build system and development server
- [ ] Set up CSS/styling solution (CSS modules or styled-components)
- [ ] Install and configure necessary dependencies

#### Core Components
- [ ] Create main App component with layout structure
- [ ] Build sidebar component with tabbed interface
- [ ] Implement note list component for sidebar
- [ ] Create note editor component (textarea or rich text)
- [ ] Build note tab component for switching between notes
- [ ] Add new note button and functionality

#### State Management
- [ ] Set up React state management (Context API or Zustand)
- [ ] Implement note store with CRUD operations
- [ ] Create API service layer for backend communication
- [ ] Add loading states and error handling

#### Features Implementation
- [ ] Implement automatic note titling with date/timestamp
- [ ] Add note creation with default title generation
- [ ] Build note switching functionality between tabs
- [ ] Implement note saving (auto-save or manual save)
- [ ] Add note deletion with confirmation
- [ ] Create note search/filter functionality

#### UI/UX Polish
- [ ] Style the sidebar and tabbed interface
- [ ] Design responsive layout for different screen sizes
- [ ] Add keyboard shortcuts for common actions
- [ ] Implement note content auto-resize
- [ ] Add visual feedback for save states

### Integration & Testing

#### API Integration
- [ ] Connect frontend to backend API endpoints
- [ ] Implement error handling for network requests
- [ ] Add retry logic for failed requests
- [ ] Test all CRUD operations end-to-end

#### Development Tools
- [ ] Set up concurrent development scripts (frontend + backend)
- [ ] Configure proxy for API calls during development
- [ ] Add hot reload for both frontend and backend
- [ ] Create development database seeding

### Production Readiness

#### Build & Deployment
- [ ] Configure production builds for both UI and backend
- [ ] Set up Docker configuration (optional)
- [ ] Create production environment variables template
- [ ] Add build scripts and deployment instructions

#### Documentation
- [ ] Write API documentation (endpoints, request/response formats)
- [ ] Create development setup instructions
- [ ] Document Redis schema and data structures
- [ ] Add troubleshooting guide

## Future Enhancements (Post-MVP)

### Authentication System
- [ ] Research and plan SIWE (Sign-In with Ethereum) integration
- [ ] Implement wallet connection in frontend
- [ ] Add SIWE authentication flow to backend
- [ ] Update API endpoints to handle user authentication
- [ ] Implement user-specific note isolation

### Advanced Features
- [ ] Add note categories/tags system
- [ ] Implement note search with full-text search
- [ ] Add export functionality (markdown, JSON)
- [ ] Create note sharing capabilities
- [ ] Add rich text editing support
- [ ] Implement note versioning/history

### Performance & Scalability
- [ ] Add Redis persistence configuration
- [ ] Implement note pagination for large datasets
- [ ] Add caching strategies for frequently accessed notes
- [ ] Optimize bundle size and loading performance

## Task Dependencies

- Backend API setup must be completed before frontend API integration
- Redis data schema should be finalized before implementing CRUD operations
- Core components should be built before implementing state management
- Authentication preparation should be done early to avoid refactoring later

## Estimated Timeline

- **Project Setup**: 1-2 hours
- **Backend Development**: 6-8 hours
- **Frontend Development**: 8-12 hours
- **Integration & Testing**: 2-4 hours
- **Total Estimated Time**: 17-26 hours