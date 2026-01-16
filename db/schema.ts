import { varchar, pgTable, integer } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
   id: integer("id").primaryKey(),
   name: varchar('name').notNull(),
   email: varchar("email").notNull()
})
