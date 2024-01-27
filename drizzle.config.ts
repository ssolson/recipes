require('dotenv').config({ path: `.env.local` })

import type { Config } from "drizzle-kit";
import { defineConfig } from 'drizzle-kit'


if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI is missing");
}


export default defineConfig({
    schema: "./src/categories.ts",
    out: "./src/db/drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URI,
    },
    verbose: true,
  }) satisfies Config;
