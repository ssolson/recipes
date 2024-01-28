import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
 
import {categories, ingredients, instructionIngredients, instructionMedia,  instructions, mediaResolutions, media, recipeCategories, recipeIngredients, recipeMedia, recipes, stories, storyMedia,  units } from '@/db/schema/'

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString);
const db = drizzle(client);

// Example usage
async function fetchAllRecipes() {
  try {
    const allRecipes = await db.select().from(recipes);
    return allRecipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

// Call the function or export it to use elsewhere
fetchAllRecipes().then(recipes => console.log(recipes));

export default db;