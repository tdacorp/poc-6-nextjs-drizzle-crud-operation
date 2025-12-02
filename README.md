### Blog CMS (Next.js + Drizzle + PostgreSQL) ###

A simple Content Management System that supports Posts, Categories, and Comments.
Built using Next.js App Router, Drizzle ORM, and PostgreSQL.

# Features

Create and manage Posts

Create Categories and assign them to posts

Add Comments to posts

Many-to-many: Posts ↔ Categories

One-to-many: Post → Comments

# Database Models

Post: title, slug, content, status, timestamps
Category: name, slug
Comment: postId, userName, text, timestamp
PostCategory: join table for post-category relation

# Tech Stack

Next.js 14 (App Router)

Drizzle ORM

PostgreSQL

Zod (Validation)

React + Tailwind CSS

# What I Learned

Building fullstack apps with Next.js

Designing relational schemas (1:N, N:M)

CRUD operations with Drizzle ORM

Server Actions for secure backend logic

Input validation using Zod

Deploying on Vercel

# Setup
npm install

Add environment variable:
DATABASE_URL=your-postgres-connection

Run migrations:
npx drizzle-kit migrate

Start server:
npm run dev
