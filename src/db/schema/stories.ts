import { pgTable, text, bigint } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import { recipes } from "./recipes";

export const stories = pgTable("stories", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	storyId: bigint("story_id ", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	recipeId: bigint("recipe_id ", { mode: "number" }).notNull().references(() => recipes.recipeId),
	content: text("content").notNull(),
});

export type StoriesInsert = InferInsertModel<typeof stories>;
export type StoriesSelect = InferSelectModel<typeof stories>;