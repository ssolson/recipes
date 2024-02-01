"use server"

import { revalidatePath } from "next/cache";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { recipes } from '@/db/schema'
import { handleRecipeError } from './handleError'
import { safeParseRecipe } from './parseRecipe'

const connectionString = process.env.DATABASE_URI || "";
const client = postgres(connectionString)
const db = drizzle(client);

export async function createRecipe(prevState:any,  formData: FormData) {
  const form = formData || prevState?.formData; 
  try {
    const parseResult = await safeParseRecipe(form);

    if (!parseResult.success) {
      return { errors: parseResult.error.format() };
    }

      await db.insert(recipes).values(parseResult.data);    

    return revalidatePath('/form');
  } catch (e) {
    // Check if e is an instance of Error
    if (e instanceof Error) {
      return handleRecipeError(e);
    } else {
      // Handle the case where e is not an Error object
      console.error("Unknown error:", e);
      return { errors: { general: "An unknown error occurred." } };
    }
  }
}
