import { pgTable, smallint, varchar, numeric } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const units = pgTable("units", {
	unitId: smallint("unit_id").primaryKey().notNull(),
	name: varchar("name").notNull(),
	symbol: varchar("symbol").notNull(),
	type: varchar("type").notNull(),
	system: varchar("system").notNull(),
	conversionFactor: numeric("conversion_factor"),
});

export type UnitsInsert = InferInsertModel<typeof units>;
export type UnitsSelect = InferSelectModel<typeof units>;