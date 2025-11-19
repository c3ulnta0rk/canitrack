# Canitrack

A performance tracking platform for canicross athletes and their canine partners.

## Overview

Canitrack is designed to help canicross participants track and analyze their race performances over time. Whether you're a competitive athlete or recreational runner, Canitrack provides a comprehensive system to monitor your progress and your dog's performance across multiple events.

## What is Canicross?

Canicross is a sport where runners are connected to their dogs via a harness and bungee line. The dog runs ahead, providing forward momentum while the human runs behind. It combines fitness training for both human and dog in a fun, competitive environment.

## Features

### Race Management
- **Event Tracking**: Record race details including date, location, and course information
- **Performance Metrics**: Track completion times for each race
- **Environmental Data**: Optional weather conditions recording
- **Course Details**: Store information about race routes and terrain

### Participant Profiles
- **Team-Based Tracking**: Each participant is a human-dog team
- **Human Profiles**:
  - Age
  - Gender
  - Performance history
- **Dog Profiles**:
  - Age
  - Breed
  - Gender
  - Performance history

### Performance Analysis
- Track improvements over time
- Compare performances across different races
- View statistics for individual runners and dogs
- Analyze performance by various factors (weather, course type, etc.)

## Data Model

The core data structure consists of:

- **Races**: Events with metadata (date, location, route, weather)
- **Participants**: Human-dog pairs with individual attributes
- **Results**: Performance records linking participants to specific races

## Technical Goals

### Architecture
- **Serverless-First**: Designed with serverless deployment in mind for scalability and cost-efficiency
- **Low Maintenance**: Simple architecture that minimizes operational overhead
- **Flexible Deployment**: Can be deployed on various platforms

### Development Principles
- Clean, maintainable codebase
- Well-documented features
- Easy to extend and modify
- Minimal dependencies

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Layer**: In-memory database (easily replaceable with Prisma/PostgreSQL)
- **Deployment**: Vercel-ready (serverless)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd canitrack
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Project Structure

```
canitrack/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── races/        # Race endpoints
│   │   └── teams/        # Team endpoints
│   ├── races/            # Race pages
│   ├── teams/            # Team pages
│   ├── stats/            # Statistics page
│   └── page.tsx          # Home page
├── lib/                   # Shared utilities
│   └── db/               # Database layer
│       ├── types.ts      # TypeScript types
│       ├── seed.ts       # Demo data
│       └── database.ts   # Database functions
└── prisma/               # Prisma schema (for future use)
```

## Features Implemented

### ✅ Completed
- [x] Core data models and database schema
- [x] Race registration and management
- [x] Participant profile system
- [x] Performance tracking and analytics
- [x] User interface
- [x] API development
- [x] Responsive design with dark mode support

### Current Features

1. **Home Page** - View all races with key statistics
2. **Race Details** - See full race results, times, and rankings
3. **Team Profiles** - View individual team statistics and race history
4. **Statistics Dashboard** - Global leaderboards and performance insights
5. **API Endpoints** - RESTful API for all data access

## Demo Data

The application comes with fictional demo data including:
- 6 human-dog teams
- 6 races across different locations
- Multiple results with realistic times and rankings

## Migrating to a Real Database

The current in-memory database can be easily replaced with Prisma + PostgreSQL:

1. Uncomment the Prisma schema in `prisma/schema.prisma`
2. Install Prisma Client: `npm install @prisma/client`
3. Set up your database URL in `.env`
4. Run migrations: `npx prisma migrate dev`
5. Replace imports in pages from `lib/db/database` to Prisma Client
6. Deploy to a platform with PostgreSQL support (Vercel, Railway, etc.)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with zero configuration

The application is fully serverless-ready and optimized for Vercel deployment.

## Roadmap

### Future Enhancements
- [ ] User authentication and authorization
- [ ] Add/edit races and results functionality
- [ ] Photo uploads for teams and races
- [ ] Advanced filtering and search
- [ ] Race registration system
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Integration with GPS tracking devices

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

*To be determined*

---

**Note**: This project is in active development. Features and documentation will be updated regularly.
