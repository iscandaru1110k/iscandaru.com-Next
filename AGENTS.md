# AGENTS.md

## Project Overview

This is a personal website rebuild project using:

- Next.js App Router
- TypeScript
- CSS Modules
- Vitest

The previous application was built with Flask + HTML/CSS/JS.

This project rebuilds the application from scratch with a focus on:

- maintainability
- simple architecture
- learning application design
- feature-based structure

Application root is:

app/

---

## Current Scope

Current scope is limited to small labo-style tools.

Implemented or planned features:

- Date difference calculator
- Birthday calculator

---

## Out of Scope

Do not introduce the following unless explicitly approved:

- Database
- Authentication
- API routes
- Docker
- Complex global state management
- Redux / Zustand / MobX
- Excessive abstraction
- Premature optimization
- Large UI frameworks

Keep the project lightweight.

---

## Development Principles

- Keep implementations simple.
- Avoid over-engineering.
- Prefer readability over cleverness.
- Build incrementally.
- Verify changes step by step.
- Keep diffs minimal.
- Avoid unrelated refactoring.
- Do not expand scope without approval.

---

## Architecture Policy

### Routing Responsibility

src/app is responsible for:

- routing
- page composition
- metadata

Do not place business logic in app.

---

### Feature Responsibility

Feature-specific code belongs under:

src/features/\*

Each feature may contain:

- components/
- utils/
- types/
- constants/
- hooks/
- tests/

Example:

- src/features/labo/date-diff
- src/features/labo/birthday

---

## Shared vs Feature-Specific Code

Shared labo-related code should live under:

src/features/labo/

Examples:

- src/features/labo/types/date.ts
- src/features/labo/utils/date.ts

Feature-specific code should remain inside the feature directory.

Do not aggressively commonize code too early.

---

## Import Policy

Use path aliases:

@/features/...

Avoid deep relative imports like:

../../../

---

## Component Policy

Shared UI components:

src/components/

Feature-specific UI components:

src/features/\*/components/

Client Components using hooks or event handlers must include:

"use client";

Do not create generic reusable components prematurely.

Only extract shared UI after duplication becomes clear.

---

## Logic Policy

Calculation logic must be implemented as pure functions.

Place calculation logic under:

utils/

Rules:

- Do not depend on React
- Avoid browser APIs unless necessary
- Keep functions testable
- Avoid hidden side effects
- Prefer explicit naming

Example functions:

- calculateAge()
- calculateDateDiff()
- calculateDaysUntilNextBirthday()

---

## TypeScript Policy

- Avoid any
- Prefer simple types
- Do not over-model data
- Use shared types only when actual reuse exists

Shared labo types belong under:

src/features/labo/types/

---

## Styling Policy

Use CSS Modules for component styling.

Example:

Component.tsx
Component.module.css

Keep styling simple and maintainable.

Prefer:

- locally scoped styles
- readable class names
- small component-level stylesheets

Avoid:

- large CSS frameworks
- CSS-in-JS libraries
- unnecessary utility abstraction
- excessive global CSS

globals.css should contain only:

- reset styles
- base typography
- layout foundations
- shared variables if needed

Do not place feature-specific styling in globals.css.

---

## Testing Policy

Use Vitest.

Pure functions should be tested.

Prefer colocated tests near implementation files.

Example:

utils/birthday.ts
utils/birthday.test.ts

Minimum expectations:

- normal cases
- edge cases
- invalid input cases

---

## Refactoring Policy

Do not perform large refactors unless explicitly requested.

Avoid:

- unrelated formatting changes
- renaming files unnecessarily
- restructuring directories without reason
- unnecessary abstraction
- excessive commonization

Protect existing stable functionality.

---

## Existing Stable Features

The following features are already working and should not be broken:

- /labo/date-diff

---

## Documentation Policy

Update documents when important decisions or scope changes occur.

Documents:

- docs/requirements.md
- docs/design.md
- docs/decisions.md
- docs/tasks.md
- docs/coding-rules.md

Important technical decisions should be recorded in:

docs/decisions.md

---

## Before Finishing a Task

Run checks where applicable:

- pnpm test
- pnpm lint
- pnpm build

Also verify:

- app starts locally
- target page renders
- no existing feature is broken
- no unnecessary dependency was added

---

## AI Assistant Behavior

When acting as an AI coding assistant:

- Read this file before making changes
- Prefer minimal changes
- Respect existing architecture
- Explain assumptions when ambiguous
- Do not silently introduce new architecture
- Do not replace simple code with complex abstractions
- Avoid unnecessary dependency additions
- Keep changes understandable and incremental
