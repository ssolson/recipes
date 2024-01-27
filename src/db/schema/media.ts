import { pgTable, bigint, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const media = pgTable("media", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).primaryKey().notNull(),
	mediaType: varchar("media_type").notNull(),
	filePath: varchar("file_path").notNull(),
	description: varchar("description").notNull(),
});