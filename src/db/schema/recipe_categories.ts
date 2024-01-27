import { pgTable, bigint } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import { recipes } from "./recipes";
import { categories } from "./categories";

export const recipeCategories = pgTable("recipe_categories", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	recipeId: bigint("recipe_id", { mode: "number" }).primaryKey().notNull().references(() => recipes.recipeId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoryId: bigint("category_id", { mode: "number" }).notNull().references(() => categories.categoryId),
});

export type RecipeCategoriesInsert = InferInsertModel<typeof recipeCategories>;
export type RecipeCategoriesSelect = InferSelectModel<typeof recipeCategories>;