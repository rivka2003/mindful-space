# Mindful Space Project

Mindful Space is a full-stack wellbeing app with a React/Vite frontend and a Node.js/Express/MongoDB backend. It supports authentication, public and private content, likes, reminder subscriptions, a personal profile area, and a dedicated admin workspace.

## Tech Stack

### Frontend
1. React 19
2. Vite
3. React Router
4. TanStack React Query
5. MUI

### Backend
1. Node.js
2. Express
3. MongoDB + Mongoose
4. JWT
5. bcryptjs
6. CORS

## Project Structure

1. `client/` contains the frontend app.
2. `server/` contains the backend API.
3. Each side has its own `package.json`.

### Frontend Structure
1. `client/src/api` contains fetch-only API modules.
2. `client/src/hooks` contains React Query hooks and shared auth/action hooks.
3. `client/src/mappers` normalizes backend payloads into UI-friendly objects.
4. `client/src/features` holds content and admin configuration.
5. `client/src/components` contains layout, content, auth, profile, and admin UI.
6. `client/src/pages` contains route-level pages.
7. `client/src/providers/AuthProvider.jsx` stores auth state, bootstraps the current user, and exposes login/register/logout helpers.
8. `client/src/router/Router.jsx` defines all application routes.

### Backend Structure
1. `server/app.js` loads `.env`, connects MongoDB, registers routes, and attaches the error handler.
2. `server/config/db.js` connects to MongoDB via `MONGO_URI`.
3. `server/models` defines Mongoose schemas.
4. `server/controllers` contains user handlers and shared content controller factories.
5. `server/services` contains the main business logic.
6. `server/routes` defines user and content endpoints.
7. `server/middleware/authMiddleware.js` handles optional auth, required auth, and admin-only checks.
8. `server/middleware/errorMiddleware.js` returns JSON errors.
9. `server/constants/contentCategories.js` defines the allowed content categories.

## Setup

### Backend
1. `cd server`
2. Install dependencies: `npm install`
3. Create `server/.env`
4. Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=30d
NODE_ENV=development
```

5. Run development server: `npm run dev`
6. Or run production-style server: `npm start`

The backend listens on `http://localhost:5000` by default, or on `process.env.PORT` in deployment environments such as Render.

### Frontend
1. `cd client`
2. Install dependencies: `npm install`
3. Create `client/.env`
4. Add:

```env
VITE_API_BASE_URL=http://localhost:5000
```

5. Run: `npm run dev`

In local development, Vite serves the frontend separately and proxies `/api` requests to the Express server.
If you want the frontend to call a separate local backend directly, you can keep `VITE_API_BASE_URL=http://localhost:5000`.

## Production Build And Single-Service Deploy

This project can be deployed as a single Node service. In that setup:
1. Vite builds the frontend into `client/dist`
2. The Express server serves the built frontend files
3. API routes continue to live under `/api/...`
4. Non-API routes such as `/profile` or `/mantras` fall back to `client/dist/index.html` so React Router works on refresh

### Render Web Service

You can deploy this project to one Render Web Service instead of splitting frontend and backend.

Use these settings:
1. Runtime: `Node`
2. Build Command: `npm --prefix server install && npm --prefix client install && npm --prefix client run build`
3. Start Command: `npm --prefix server start`

Set these environment variables in Render:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret
JWT_EXPIRES=7d
NODE_ENV=production
```

Notes:
1. Render injects `PORT` automatically, so you do not need to add it manually
2. `client/vite.config.js` proxy settings are for local development only
3. In the deployed app, the frontend uses same-origin API calls such as `/api/mantras`, so `VITE_API_BASE_URL` is not required in Render
4. The server serves `client/dist` only after the frontend build exists
5. If `client/dist` does not exist, the backend still runs and returns a simple root response at `/`

## Data Model

### User
1. Fields: `name`, `email`, `password`, `role`
2. `role` is `user` or `admin`
3. `likedContent` stores likes across all content types
4. `reminderSubscriptions` stores reminder state for `Mantra` and `Habit`

### Content Types
All content types store `likesCount`, `createdBy`, `visibility`, and timestamps.

1. `Mantra`
   - Fields: `text`, `category`, `reminderType`, `reminderTime`
   - Default `visibility`: `public`
2. `Habit`
   - Fields: `title`, `description`, `category`, `reminderType`, `reminderTime`
   - Default `visibility`: `private`
3. `Meditation`
   - Fields include `title`, `category`, `url`, `duration`
4. `Podcast`
   - Fields include `title`, `category`, `url`, `platform`
5. `JournalPrompt`
   - Fields include `question`, `category`

### Allowed Categories
`general`, `calm`, `focus`, `resilience`, `vitality`, `flow`, `manifesting`

## Authentication And Authorization

### Auth Flow
1. `POST /api/users/register` returns `{ token, user }`
2. `POST /api/users/login` returns `{ token, user }`
3. The frontend stores auth state in localStorage under `mindful-space-auth`
4. On app load, the frontend calls `GET /api/users/me` to refresh the current user
5. Protected endpoints require `Authorization: Bearer <token>`

### Permission Rules
1. Public content routes use optional auth, so visible content can be fetched even without login
2. Admin users can see all content in collection endpoints
3. Regular authenticated users can see:
   - all `public` items
   - their own `private` items
4. Unauthenticated users can see only `public` items
5. Private item detail pages are accessible only to the owner or an admin
6. Update and delete actions are allowed only for the owner or an admin
7. `/api/users` and `/api/users/:id` admin actions are admin-only
8. The `/admin` frontend route is guarded for admin users only

## Backend API

### User Endpoints
1. `POST /api/users/register`
2. `POST /api/users/login`
3. `GET /api/users/me`
4. `GET /api/users/favorites`
5. `PUT /api/users/profile`
6. `PUT /api/users/change-password`
7. `DELETE /api/users/delete`
8. `GET /api/users` admin only
9. `PUT /api/users/:id` admin only
10. `DELETE /api/users/:id` admin only

### Content Endpoints
For each of these resources:
- `/api/mantras`
- `/api/meditations`
- `/api/podcasts`
- `/api/journal-prompts`
- `/api/habits`

Available routes:
1. `GET /api/<type>` returns visible items, optionally filtered by `?category=...`
2. `GET /api/<type>/mine` returns only items created by the current user
3. `GET /api/<type>/:id` returns one item if access is allowed
4. `POST /api/<type>` creates a new item
5. `PUT /api/<type>/:id` updates an existing item
6. `DELETE /api/<type>/:id` deletes an item
7. `POST /api/<type>/:id/like` likes an item
8. `DELETE /api/<type>/:id/like` removes a like

Reminder routes exist only for mantras and habits:
1. `POST /api/mantras/:id/reminder`
2. `DELETE /api/mantras/:id/reminder`
3. `POST /api/habits/:id/reminder`
4. `DELETE /api/habits/:id/reminder`

## Business Rules

### Likes
1. Likes are stored on the user in `likedContent`
2. Each item also stores `likesCount`
3. A user cannot like the same item twice
4. Deleting an item removes related likes from users

### Reminders
1. Reminder subscriptions are stored on the user, not on a scheduler
2. Only `Mantra` and `Habit` support reminder subscriptions
3. Activating a reminder marks the user subscription as active
4. Deactivating a reminder sets `isActive` to `false`
5. Deleting a mantra or habit removes related reminder subscriptions from users
6. The current implementation stores reminder state only; it does not send notifications by itself

### Content Visibility
1. `visibility` can be `public` or `private`
2. `Habit` defaults to `private`
3. Most other content defaults to `public` unless explicitly changed

### Update Safety
The backend blocks updates to internal fields such as `_id`, `createdBy`, `likesCount`, `createdAt`, and `updatedAt`.

## Frontend Flow

### Routes
1. `/` home page
2. `/auth` login and registration
3. `/:contentType` public content pages for `mantras`, `meditations`, `podcasts`, `journal-prompts`, and `habits`
4. `/profile` personal area
5. `/admin` admin-only workspace

### User Flow
1. Visitors can browse visible public content without logging in
2. Logged-in users can like content and toggle reminder subscriptions where supported
3. The profile page shows:
   - user info
   - liked content
   - active reminder subscriptions
   - a personal content manager for the user's own items
4. The profile page is not only for display; authenticated users can also create, edit, and delete their own content there

### Admin Flow
1. Admins access a separate `/admin` workspace
2. The admin workspace has tabs for:
   - mantras
   - meditations
   - podcasts
   - journal prompts
   - habits
   - users
3. Admins can create, edit, and delete content from one tabbed workspace
4. Admins can edit user `name`, `email`, and `role`, and can delete users

## Frontend Architecture Rules

1. API modules fetch data and throw errors when requests fail
2. React Query owns server state
3. Mappers normalize backend payloads near the API boundary
4. Route pages stay thin and delegate rendering to reusable components
5. Public content pages and admin management stay separate

## Error Handling

1. The backend returns JSON errors with `message`
2. Stack traces are included only when `NODE_ENV !== production`
3. The frontend extracts backend error messages and throws `Error` objects with HTTP status attached

## Current Limitations

1. There is no automated reminder delivery service yet
2. There are currently no real backend tests configured
3. Favorites in the profile page show normalized titles, but reminder subscriptions currently display raw `entityId` values rather than populated item names

## Future Improvements

1. Security hardening
   - Add stronger validation for email, password, URLs, and free-text fields
   - Add rate limiting for login, register, and other sensitive endpoints
   - Restrict CORS more tightly for production instead of allowing all origins
   - Add `helmet`, request size limits, safer auth cookie options, and more production-grade protection against XSS and abuse
   - Normalize user emails consistently with trimming and lowercase handling to improve uniqueness and reduce duplicate account edge cases

2. Email reminder delivery
   - Complete the reminder feature by adding a real background reminder service
   - Use email integration such as SendGrid, Resend, Nodemailer, or another provider
   - Add scheduled jobs to send reminder emails for active `Mantra` and `Habit` subscriptions at the selected time
   - Expand the current reminder model so users can manage reminder frequency, timezone, and delivery preferences
   - Add delivery logs, retry handling, and unsubscribe / pause controls

3. Frontend visual improvements
   - Improve the visual identity with stronger branding, richer layout sections, and more polished responsive design
   - Add icons for content types, actions, categories, and reminder states
   - Add curated illustrations, photos, or background imagery to make the experience feel warmer and more engaging
   - Improve content cards with better hierarchy, richer metadata presentation, and clearer empty / loading states
   - Add subtle motion, transitions, and better visual feedback for actions such as likes, saves, and reminders

4. Personalized recommendations
   - Add user preference tracking based on liked categories, created content, favorites, and reminder behavior
   - Build a recommendation layer that suggests mantras, habits, meditations, podcasts, or journal prompts based on preferred categories
   - Use onboarding questions or profile settings to learn user goals such as calm, focus, resilience, or vitality
   - Add a personalized home feed or "suggested for you" section
   - In a later phase, integrate an external recommendation or AI layer to generate more adaptive suggestions from user behavior over time
