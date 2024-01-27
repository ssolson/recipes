import { bigint, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const ingredients = pgTable("ingredients", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ingredientId: bigint("ingredient_id", { mode: "number" }).primaryKey().notNull(),
	name: varchar("name").notNull(),
	description: varchar("description"),
	plu: smallint("PLU"),
})

export type IngredientsInsert = InferInsertModel<typeof ingredients>;
export type IngredientsSelect = InferSelectModel<typeof ingredients>;