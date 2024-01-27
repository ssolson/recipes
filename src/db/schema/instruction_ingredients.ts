import { pgTable, smallint, bigint, numeric } from "drizzle-orm/pg-core";
import { instructions } from "./instructions";
import { ingredients } from "./ingredients";
import { units } from "./units";
import { InferSelectModel, InferInsertModel  } from "drizzle-orm";

export const instructionIngredients = pgTable("instruction_ingredients", {
	instructionId: smallint("instruction_id").primaryKey().notNull().references(() => instructions.instructionId),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ingredientId: bigint("ingredient_id", { mode: "number" }).notNull().references(() => ingredients.ingredientId),
	unitId: smallint("unit_id").references(() => units.unitId),
	quantity: numeric("quantity"),
});

export type InstructionIngredientsInsert = InferInsertModel<typeof instructionIngredients>;
export type InstructionIngredientsSelect = InferSelectModel<typeof instructionIngredients>;
