import { pgTable, unique, pgEnum, bigint, varchar, smallint, timestamp } from "drizzle-orm/pg-core"
import { units } from "./units";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const recipes = pgTable("recipes", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
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
















