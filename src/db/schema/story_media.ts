import { smallint, bigint, pgTable } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { media } from "./media";
import { stories } from "./stories";

export const storyMedia = pgTable("story_media", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	storyId: bigint("story_id", { mode: "number" }).primaryKey().notNull().references(() => stories.storyId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull().references(() => media.mediaId),
	position: smallint("position").notNull(),
});

export type StoryMediaInsert = InferInsertModel<typeof storyMedia>;
export type StoryMediaSelect = InferSelectModel<typeof storyMedia>;