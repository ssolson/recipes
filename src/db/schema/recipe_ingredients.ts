import { pgTable, bigserial, bigint, smallint, numeric, varchar } from "drizzle-orm/pg-core";
import { recipes } from "./recipes";
import { units } from "./units";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const recipeIngredients = pgTable("recipe_ingredients", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	recipeId: bigint("recipe_id", { mode: "number" }).primaryKey().notNull().references(() => recipes.recipeId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ingredientId: bigint("ingredient_id", { mode: "number" }).notNull(),
	unitId: smallint("unit_id").notNull().references(() => units.unitId),
	totalQuantity: numeric("total_quantity").notNull(),
	totalQuantityUnit: varchar("total_quantity_unit").notNull(),
});

export type RecipeIngredientsInsert = InferInsertModel<typeof recipeIngredients>;
export type RecipeIngredientsSelect = InferSelectModel<typeof recipeIngredients>;