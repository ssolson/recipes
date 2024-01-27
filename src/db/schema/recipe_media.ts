import { pgTable, bigint, varchar, smallint } from "drizzle-orm/pg-core";
import { media } from "./media";
import { recipes } from "./recipes";

import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const recipeMedia = pgTable("recipe_media", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	recipeId: bigint("recipe_id", { mode: "number" }).primaryKey().notNull().references(() => recipes.recipeId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).references(() => media.mediaId),
	mediaRole: varchar("media_role"),
	position: smallint("position"),
});

export type RecipeMediaInsert = InferInsertModel<typeof recipeMedia>;
export type RecipeMediaSelect = InferSelectModel<typeof recipeMedia>;
