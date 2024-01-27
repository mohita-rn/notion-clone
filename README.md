Let's build a Notion like AI-powered WSYIWYG Editor
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Tools used
 - Next.js 13
 - DALL-E
 - [Vercel AI SDK](https://sdk.vercel.ai/docs)
 - [Vercel Edge Runtime](https://vercel.com/docs/functions/edge-functions/edge-runtime)
 - [Shadcn](https://ui.shadcn.com/)
 - Tailwind CSS
 - [Clerk authenticator](https://clerk.com/)
 - [DrizzleORM](https://orm.drizzle.team/)
 - [NeonDB](https://neon.tech/)
 - Firebase storage
 - Tiptap WSYIWYG Editor

## NPM Packages
 - NeonDB
 - Drizzle ORM
 - drizzle-kit
 - dotenv
 - pg

## How I did this
1. Create a new Next.js project
2. Install Drizzle ORM, we use it to interact with database
3. Create a folder in src for storing utility files. src > lib > db > index.ts (for drizzle config), schema.ts(databse schema)
4. Install drizzle-kit,it is a developer tool to migrate changes
5. Create a file drizzle.config.ts in root folder to define config for drizzle kit
6. Next.js does not allow files outside src directory to access env file, hence install dotenv.
7. In tsconfig.json change the target to es6
8. Push schema to database - ```bash npx drizzle-kit push:pg ```
9. Install pg package to interact with database
10. Run ```bash npx drizzle-kit studio ``` to see your tables
11. Create UI for adding new notebook, and displaying list of existing notebooks
12. Create a dialog box that opens when you click on new notebook button
13. Install Dialog from shadcn
  
