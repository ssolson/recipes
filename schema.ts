import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('categories', {
  id: serial('category_id').primaryKey(),
  phone: varchar('varchar', { length: 256 }),
});
