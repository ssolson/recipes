import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { categories } from '@/db/categories'

const connectionString = process.env.DATABASE_URL

console.log('connectionString', connectionString)

const client = postgres(connectionString)
const db = drizzle(client);

const allUsers = await db.select().from(categories);