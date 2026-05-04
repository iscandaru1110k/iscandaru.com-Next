# AGENTS.md

## Project Overview

This is a personal rebuild project using Next.js App Router and TypeScript.

The previous app was built with Flask + HTML/CSS/JS, but this project rebuilds it from scratch.

The goal is to keep the application simple, maintainable, and suitable for learning application design.

## Current Scope

The initial scope is limited to the `labo` feature.

Features:

- Birthday calculator
- Date difference calculator

## Out of Scope

Do not implement the following in the initial phase:

- Database
- Authentication
- API routes
- Docker
- Complex state management
- Global state management libraries
- UI component libraries
- Excessive abstraction

## Development Principles

- Keep the implementation simple.
- Avoid over-engineering.
- Use minimal external libraries.
- Use `useState` for local component state.
- Prefer readable code over clever code.
- Build small pieces and verify them step by step.
- Separate UI components from calculation logic.
- Do not expand the scope without explicit approval.

## Directory Policy

Use the following structure as the baseline:

```txt
project-root/
  app/
    src/
      app/
        layout.tsx
        page.tsx
        globals.css
        labo/
          page.tsx

      components/
        Header.tsx

      features/
        labo/
          components/
            BirthdayCalculator.tsx
            DateDiffCalculator.tsx
          utils/
            date.ts
          types.ts

  docs/
    requirements.md
    design.md
    decisions.md
    tasks.md
    coding-rules.md

  AGENTS.md
  README.md
```

## Routing Policy

Use Next.js App Router.

Routes:

```txt
/       Home page
/labo   Labo feature page
```

The `src/app` directory should focus on routing and page composition.

## Component Policy

Place shared components under:

```txt
app/src/components/
```

Place labo-specific components under:

```txt
app/src/features/labo/components/
```

Client components that use `useState` or event handlers must include:

```tsx
"use client";
```

Do not create generic components too early.  
Create shared components only after clear duplication appears.

## Logic Policy

Place date calculation logic under:

```txt
app/src/features/labo/utils/date.ts
```

The logic in `date.ts` should be implemented as pure TypeScript functions.

Rules:

- Do not depend on React.
- Do not depend on browser APIs unless necessary.
- Keep functions small and testable.
- Prefer explicit names.
- Avoid hidden side effects.

Expected functions may include:

```ts
calculateAge(birthDate: string): number
calculateDaysUntilNextBirthday(birthDate: string): number
calculateDateDiff(startDate: string, endDate: string): number
```

## TypeScript Policy

- Avoid `any`.
- Define types only when they improve readability.
- Do not over-model simple data.
- Move shared labo-related types to:

```txt
app/src/features/labo/types.ts
```

## Styling Policy

Use simple CSS.

Initial styling should be handled mainly in:

```txt
app/src/app/globals.css
```

Do not introduce Tailwind CSS, CSS frameworks, or UI libraries in the initial phase unless explicitly approved.

## Documentation Policy

Update relevant documents when the scope, design, or decisions change.

Documents:

```txt
docs/requirements.md     Requirements and scope
docs/design.md           Application design
docs/decisions.md        Decision log
docs/tasks.md            Task list
docs/coding-rules.md     Coding rules
```

When making an important technical decision, add an entry to:

```txt
docs/decisions.md
```

## Task Policy

When working from `docs/tasks.md`:

- Work on one phase or one task group at a time.
- Do not skip ahead without approval.
- Keep changes small.
- Avoid unrelated refactoring.
- Do not add dependencies unless explicitly approved.

## Before Finishing a Task

Before considering a task complete, check the following where applicable:

```bash
npm run lint
npm run dev
```

Also verify:

- The app starts locally.
- The target page renders.
- The implementation stays within the current scope.
- No unnecessary libraries were added.
- Relevant documents were updated if needed.

## AI Assistant Behavior

When acting as an AI coding assistant:

- Read this file before making changes.
- Respect `docs/requirements.md`.
- Respect `docs/design.md`.
- Respect `docs/coding-rules.md`.
- Check `docs/decisions.md` before changing established choices.
- Prefer minimal, understandable changes.
- Explain assumptions when requirements are ambiguous.
- Do not silently introduce new architecture.
- Do not replace the current design with a more complex one without approval.