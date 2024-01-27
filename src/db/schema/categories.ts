import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const categories = pgTable("categories", {
	categoryId: bigint("category_id", { mode: "number" }).primaryKey().notNull(),
	name: varchar("name"),
});

export type CategoriesInsert = InferInsertModel<typeof categories>;
export type CategoriesSelect = InferSelectModel<typeof categories>;