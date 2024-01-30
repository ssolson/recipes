"use server"

import { revalidatePath } from "next/cache";
import z, { ZodError } from "zod";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres, { PostgresError } from 'postgres'
import { categories, ingredients, instructionIngredients, instructionMedia,  instructions, mediaResolutions, media, recipeCategories, recipeIngredients, recipeMedia, recipes, stories, storyMedia,  units  } from '@/db/schema'

const scheme = z.object({
    // recipeId: z.number().positive(),
    title: z.string().min(1),
    description: z.string().min(1),
    skillLevel: z.string().min(1),
    prepTime: z.number().positive(),
    cookTime: z.number().positive(),
    timeUnits: z.number().positive(),
    servings: z.number().positive(),
    totalIngredients: z.number().positive(),
    totalSteps: z.number().positive(),
    userId: z.string().min(1),
  })

const connectionString = process.env.DATABASE_URI || "";
const client = postgres(connectionString)
const db = drizzle(client);

export async function createRecipe(prevState: any, formData: FormData) {
    console.log('createRecipe called with formData:', formData);
  try {
    const parse = scheme.safeParse({
        // recipeId: Number(formData.get("recipeId")),
        title: formData.get("title"),
        description: formData.get("description"),
        skillLevel: formData.get("skillLevel"),
        prepTime: Number(formData.get("prepTime")),
        cookTime: Number(formData.get("cookTime")),
        timeUnits: Number(formData.get("timeUnits")),
        servings: Number(formData.get("servings")),
        totalIngredients: Number(formData.get("totalIngredients")),
        totalSteps: Number(formData.get("totalSteps")),
        userId: formData.get("userId"),
    })


    if (!parse.success) {
        return { errors: parse.error.format() }; 
      }

      await db.insert(recipes).values({
        title: parse.data.title,
        description: parse.data.description,
        skillLevel: parse.data.skillLevel,
        prepTime: parse.data.prepTime,
        cookTime: parse.data.cookTime,
        timeUnits: parse.data.timeUnits,
        servings: parse.data.servings,
        totalIngredients: parse.data.totalIngredients,
        totalSteps: parse.data.totalSteps,
        userId: parse.data.userId,
    })
    
    console.log("Recipe created successfully");
    return revalidatePath('/form');
} catch (e) {
    if (e instanceof ZodError) {
      // Handle Zod validation errors
      return { errors: e.format() };
    } else if (e.name === 'PostgresError' || e.message.includes('Postgres error specific message')) {
        // Handle Postgres errors
        console.error("Database error:", e.message);
      return { errors: { database: "A database error occurred." } };
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", e);
      return { errors: { general: "An unexpected error occurred." } };
    }
  }
}

// export async function getSongs() {
//     try {
//       const allSongs = await db.select().from(songs);
  
//       return {
//         success: true,
//         status: 200,
//         data: allSongs
//       }
//     } catch (e) {
//       const error = e as PostgresError;
  
//       return {
//         success: false,
//         status: 500,
//         data: [],
//         message: error.message
//       }
//     }
//   }