import z, { ZodError } from "zod";
import postgres, { PostgresError } from 'postgres';

export async function handleRecipeError(e: Error) {
    if (e instanceof ZodError) {
      // Handle Zod validation errors
      return { errors: e.format() };
    } else if (e instanceof PostgresError) {
      // Handle Postgres errors
      console.error("Database error:", e.message);
      return { errors: { database: "A database error occurred." } };
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", e);
      return { errors: { general: "An unexpected error occurred." } };
    }
  }