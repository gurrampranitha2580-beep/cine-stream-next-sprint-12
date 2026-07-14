# CineStream Next - Sprint 12

## Overview

CineStream Next is a movie browsing application built with **Next.js** and the **TMDB API**. It allows users to browse popular movies, search movies, manage favorites, and filter movies by genre and release year.

This sprint focuses on integrating **Storybook** to enable isolated component development, documentation, and UI testing.

---

## Objectives

- Integrate Storybook into the existing Next.js application
- Create reusable stories for application components
- Configure Storybook with Redux support
- Test UI components independently using mock data
- Verify that Storybook does not affect the production application

---

## Components Covered

| Component | Stories |
|-----------|---------|
| MovieCard | Default, Favorite |
| Navbar | Default, With Favorites |
| SearchSection | Default |

---

## Tech Stack

- Next.js 15
- React 19
- Redux Toolkit
- React Redux
- Storybook 10
- Jest
- React Testing Library
- TMDB API

---

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
TMDB_KEY=YOUR_TMDB_API_KEY
```

Run the application:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

Run Jest tests:

```bash
npm test
```

---

## Project Structure

```
.storybook/
src/
 ├── app/
 ├── components/
 │    ├── MovieCard.jsx
 │    ├── Navbar.jsx
 │    ├── SearchSection.jsx
 │    ├── FilterSidebar.jsx
 │    ├── MovieCard.stories.js
 │    ├── Navbar.stories.js
 │    └── SearchSection.stories.js
 ├── lib/
 └── store/
```

---

## Sprint 12 Deliverables

- Storybook integrated successfully
- Storybook configured for Next.js
- Redux Provider configured for Storybook
- Stories created for major UI components
- Global styling applied in Storybook
- Storybook build completed successfully
- Existing application functionality preserved

---
