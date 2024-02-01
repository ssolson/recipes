import { pgTable, unique, pgEnum, bigint,bigserial,  varchar, smallint, timestamp } from "drizzle-orm/pg-core"
import { units } from "./units";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const recipes = pgTable("recipes", {
	mediaId: bigserial("recipe_id", { mode: "number" }).primaryKey().notNull(),
	title: varchar("title").notNull(),
	description: varchar("description").notNull(),
	skillLevel: varchar("skill_level").notNull(),
	prepTime: smallint("prep_time").notNull(),
	cookTime: smallint("cook_time").notNull(),
	timeUnits: smallint("time_units").notNull().references(() => units.unitId),
	servings: smallint("servings").notNull(),
	totalIngredients: smallint("total_ingredients").notNull(),
	totalSteps: smallint("total_steps").notNull(),
	timeAdded: timestamp("time_added", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: varchar("user_id").notNull(),
},
(table) => {
	return {
		recipesTitleKey: unique("recipes_title_key").on(table.title),
	}
});


// Schema for selecting a recipe - can be used to validate API responses
const selectUserSchema = createSelectSchema(recipes);

// Refining the fields - useful if you want to change the fields before they become nullable/optional in the final schema
export const insertRecipesSchema = createInsertSchema(recipes, {
	prepTime: (schema) => schema.prepTime.positive(),
	cookTime: (schema) => schema.cookTime.positive(),
	servings: (schema) => schema.servings.positive(),
	totalIngredients: (schema) => schema.totalIngredients.positive(),
	totalSteps: (schema) => schema.totalSteps.positive(),
  });