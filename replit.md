# NeuroBoutique

## Overview

NeuroBoutique is a sophisticated e-commerce platform specializing in cognitive enhancement products. The application features an AI-powered recommendation engine that curates products based on individual cognitive profiles, providing personalized shopping experiences for brain health and performance optimization. The platform offers supplements, brain gadgets, and wellness products with intelligent recommendations, dynamic pricing, and interactive brain visualization features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18 and TypeScript, using Vite as the build tool. The application follows a component-based architecture with:
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom color variables for cognitive categories (memory, focus, sleep, energy, mood)
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and neural pathway visualizations

The frontend implements a dark-themed, futuristic design with neural network visualizations and holographic-style components. Key features include interactive brain visualizations, AI recommendation badges, and real-time countdown timers for flash deals.

### Backend Architecture
The backend uses Express.js with TypeScript, following a RESTful API design pattern:
- **Server Framework**: Express.js with middleware for logging, JSON parsing, and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL database
- **Schema Design**: Type-safe database schemas with Zod validation
- **Route Organization**: Modular route handlers for users, products, bundles, orders, and offers
- **Storage Abstraction**: Interface-based storage layer for database operations

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations:
- **Users Table**: Stores user profiles with cognitive assessments and loyalty points
- **Products Table**: Contains supplement and gadget information with neural impact scores
- **Bundles Table**: Personalized product combinations with predicted cognitive benefits
- **Orders Table**: Transaction history and fulfillment tracking
- **Offers Table**: Dynamic pricing and flash deal management
- **User Rewards Table**: Loyalty program points and tier progression

The database schema includes JSONB fields for storing complex cognitive profile data and neural impact measurements.

### Authentication and Authorization
The application currently implements a mock authentication system with:
- User profile management endpoints
- Session-based authentication preparation (connect-pg-simple for session storage)
- Role-based access patterns in the storage interface

### AI Recommendation Engine
A sophisticated recommendation system that:
- Analyzes user cognitive profiles (memory, focus, sleep, energy, mood scores)
- Calculates personalized product scores based on individual weaknesses
- Generates dynamic recommendation badges and neural pathway visualizations
- Provides bundle suggestions for multi-faceted cognitive enhancement
- Updates recommendations based on user behavior and purchase history

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with the @neondatabase/serverless driver
- **Drizzle Kit**: Database migration and schema management tools

### UI and Styling
- **Radix UI**: Comprehensive component library for accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom cognitive theme variables
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Smooth carousel components for product showcases

### Development and Build Tools
- **Vite**: Fast build tool with React plugin and runtime error handling
- **TypeScript**: Type safety across frontend, backend, and shared schemas
- **ESBuild**: Fast JavaScript bundling for production builds
- **Replit Integration**: Development environment plugins and cartographer for debugging

### Animation and Interaction
- **Framer Motion**: Advanced animation library for neural visualizations and smooth transitions
- **Class Variance Authority**: Type-safe component variant management
- **CLSX/Tailwind Merge**: Conditional CSS class composition utilities

### Form Handling and Validation
- **React Hook Form**: Performant form state management
- **Zod**: Runtime type validation and schema generation
- **Drizzle-Zod**: Integration between database schemas and validation

### Session Management
- **Connect-PG-Simple**: PostgreSQL session store for Express sessions
- **Express Session**: Server-side session management middleware