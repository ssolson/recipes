import { bigint, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import { media } from "./media";

export const mediaResolutions = pgTable("media_resolutions", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaResolutionId: bigint("media_resolution_id", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull().references(() => media.mediaId),
	resolution: varchar("resolution").notNull(),
	filePath: uuid("file_path").defaultRandom(),
});

export type MediaResolutionsInsert = InferInsertModel<typeof mediaResolutions>;
export type MediaResolutionsSelect = InferSelectModel<typeof mediaResolutions>;