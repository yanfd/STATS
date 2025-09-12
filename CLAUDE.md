# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All projects in this repository are Next.js applications. Navigate to the specific project directory before running commands:

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

This repository contains multiple Next.js projects for testing and experimentation:

### `/globe` and `/globe2`
Interactive 3D globe visualizations using Three.js:
- Features animated starfields, atmospheric glow effects, and color transitions
- Uses custom GLSL shaders for atmospheric rendering
- Implements progressive texture loading (wireframe → high-res textures)
- Built with React, Three.js, Framer Motion, and Tailwind CSS

### `/project2/nextjs_testing`
Component library and UI experimentation:
- Collection of reusable React components (cards, audio players, Twitter integration)
- Uses Radix UI primitives and shadcn/ui components
- Includes RSS parsing, Twitter API integration, and audio visualization
- Features multiple page routes for testing different UI patterns

## Technology Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS v4+ with PostCSS
- **3D Graphics**: Three.js with custom shaders
- **UI Components**: Radix UI primitives, shadcn/ui, Lucide React icons
- **Animation**: Framer Motion
- **Build Tool**: Turbopack for development

## Architecture Notes

- All projects use client-side rendering patterns (`"use client"` directives)
- Components follow the shadcn/ui convention with `@/components/ui/` imports
- Three.js components handle their own cleanup and animation loops
- Responsive design patterns with Tailwind utilities
- TypeScript throughout with proper type definitions

## Conversation History & Context

### Session: 2025-09-11

**Morning Session**
- User greeted and asked about Claude CLI memory storage methods
- Explained that Claude CLI doesn't persist memory between sessions
- Suggested common approaches: CLAUDE.md, command history, manual exports, Git commits
- User requested to update CLAUDE.md to save conversation records

**Key Decisions & Changes:**
- Added this Conversation History section to track important interactions
- Will maintain ongoing record of significant code changes and decisions

### Ongoing Tasks & Notes

**Current Focus Areas:**
- Hughes page development (user opened hughes/page.tsx and hughes_routes.py)
- Testing FastAPI integration (user opened test.py)

**Important Context to Remember:**
- User prefers concise responses
- User is working on multiple Next.js projects with FastAPI backend
- Repository contains experimental UI components and 3D visualizations