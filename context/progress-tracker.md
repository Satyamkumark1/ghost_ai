# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Database & Prisma Setup

## Current Goal

- Implement Prisma models and client per 05-prisma.md

## Completed

- Install and configure shadcn/ui
- Add shadcn components: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea
- Verify theme matching in `globals.css` (Forced default to dark mode)
- Build base chrome components (Editor Navbar and Project Sidebar)
- Install `@clerk/themes` and configure `ClerkProvider` in root layout
- Create `proxy.ts` middleware to protect routes
- Implement responsive Sign In and Sign Up pages with custom layout
- Configure `/` redirect logic to `/editor` (authed) or `/sign-in` (unauthed)
- Add `UserButton` to `EditorNavbar`
- Project Dialogs (Create, Rename, Delete)
- Mock project list in Project Sidebar
- Editor Home blank slate state

## In Progress 

- Create Prisma models (Project, ProjectCollaborator)
- Setup Prisma Client singleton (`lib/prisma.ts`)
- Run initial migration

## Next Up

- Begin work on next specs unit

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- [Decisions made that affect the system design or
  data model — include why the decision was made]

## Session Notes

- [Context needed to resume work in the next session]
