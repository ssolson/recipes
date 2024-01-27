import { pgTable, bigserial, bigint, smallint, text, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";
import { recipes } from "./recipes";

export const instructions = pgTable("instructions", {
	instructionId: smallint("instruction_id").primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	recipeId: bigint("recipe_id", { mode: "number" }).notNull().references(() => recipes.recipeId),
	stepNumber: smallint("step_number").notNull(),
	component: varchar("component").notNull(),
	componentStepNumber: smallint("component_step_number ").notNull(),
	instruction: text("instruction").notNull(),
	notes: varchar("notes"),
});

export type InstructionsInsert = InferInsertModel<typeof instructions>;
export type InstructionsSelect = InferSelectModel<typeof instructions>;
