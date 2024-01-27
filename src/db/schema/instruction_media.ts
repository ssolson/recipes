import { pgTable, smallint, bigint } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import { instructions } from "./instructions";
import { media } from "./media";

export const instructionMedia = pgTable("instruction_media", {
	instructionId: smallint("instruction_id").primaryKey().notNull().references(() => instructions.instructionId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mediaId: bigint("media_id", { mode: "number" }).notNull().references(() => media.mediaId),
	position: smallint("position"),
});

export type InstructionMediaInsert = InferInsertModel<typeof instructionMedia>;
export type InstructionMediaSelect = InferSelectModel<typeof instructionMedia>;