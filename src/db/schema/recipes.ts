import { pgTable, unique, pgEnum, bigint, varchar, smallint, timestamp } from "drizzle-orm/pg-core"
import { units } from "./units";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const recipes = pgTable("recipes", {
	recipeId: bigint("recipe_id", { mode: "number" }).primaryKey().notNull(),
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

export type RecipesInsert = InferInsertModel<typeof recipes>;
export type RecipesSelect = InferSelectModel<typeof recipes>;
