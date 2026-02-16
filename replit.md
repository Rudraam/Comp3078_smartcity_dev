# Smart City Explorer

## Overview

Smart City Explorer is a comprehensive web application that provides users with real-time city information including weather, air quality, events, transportation options, restaurants, and hotels. The application features an AI-powered chat assistant to help users explore cities and get personalized recommendations.

The app follows a guided user journey: welcome screen → authentication → city search → interactive dashboard with detailed city data and AI assistance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Single Page Application (SPA) architecture with client-side routing managed through view state

**UI Component System:**
- shadcn/ui component library built on Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes with CSS variables
- Design follows "New York" style variant with modern, clean aesthetics

**State Management:**
- TanStack Query (React Query) for server state management and data caching
- Local React state for UI interactions and view navigation
- Component-level state management without global state library

**Styling Approach:**
- Tailwind-based design system with consistent spacing (4, 6, 8, 12, 16, 24 units)
- Custom color palette using HSL values for both light and dark themes
- Typography system using Inter (body) and Outfit (headings) fonts
- Responsive design with mobile-first breakpoint at 768px

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript
- ESM module system for modern JavaScript features
- Custom middleware for request logging and error handling

**API Design:**
- RESTful API endpoints under `/api` namespace
- JSON-based request/response format
- Centralized error handling middleware

**Key Services:**
- AI Chat Assistant using OpenAI GPT-5 API for city-specific information
- User authentication endpoints (currently using in-memory storage)
- Modular route registration system for scalability

### Data Layer

**Database Strategy:**
- Drizzle ORM configured for PostgreSQL via Neon serverless
- Schema-first approach with TypeScript types generated from database schema
- Connection pooling using Neon's serverless driver with WebSocket support

**Current Implementation:**
- In-memory storage (`MemStorage`) for user data during development
- Prepared for database migration with interface-based storage abstraction (`IStorage`)
- User schema defined with username/password authentication

**Data Validation:**
- Zod schemas derived from Drizzle table definitions for runtime validation
- Type-safe insert/select operations throughout the application

### Authentication & Authorization

**Current Approach:**
- Basic username/password authentication
- In-memory user storage for development phase
- Session management prepared but not fully implemented
- Interface designed for easy migration to persistent storage

**Planned Enhancement:**
- Database-backed user sessions using `connect-pg-simple`
- Token-based or session-based authentication
- Password hashing and secure credential storage

## External Dependencies

### Third-Party APIs

**OpenAI Integration:**
- GPT-5 model for AI chat assistant functionality
- Conversational history management for context-aware responses
- City-specific prompts for weather, events, transportation, restaurants, and hotels
- API key authentication via environment variables

### Database Services

**Neon PostgreSQL:**
- Serverless PostgreSQL database
- WebSocket-based connection for edge compatibility
- Connection string configured via `DATABASE_URL` environment variable
- Drizzle Kit for schema migrations

### UI Component Libraries

**Radix UI Primitives:**
- Comprehensive collection of unstyled, accessible components
- Used as foundation for custom shadcn/ui components
- Includes: Dialog, Dropdown, Popover, Tabs, Toast, Select, and 20+ other primitives

**Styling Dependencies:**
- Tailwind CSS for utility classes
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for conditional className composition

### Development Tools

**Replit Integration:**
- Vite plugin for runtime error overlay
- Cartographer plugin for code navigation (development only)
- Development banner for external access

**Build & Type Checking:**
- TypeScript compiler for type checking
- esbuild for server-side bundling in production
- tsx for development server execution

### Asset Management

**Images & Media:**
- Local image assets stored in `attached_assets/generated_images/`
- Used for hero sections, dashboard illustrations, and feature showcases
- Images include: city panoramas, restaurant interiors, hotel rooms, dashboard interfaces

### Development Dependencies

**Code Quality:**
- TypeScript for static type checking
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Strict TypeScript configuration with modern ESNext features