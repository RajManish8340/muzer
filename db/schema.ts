import { varchar, pgTable, integer, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const roleEnum = pgEnum("role", ["normal", "admin"])

export const userTable = pgTable("users", {
  id: integer("id").primaryKey(),
  name: varchar('name').notNull(),
  email: varchar("email").notNull(),
  role: roleEnum()
})

export const adminTable = pgTable("admins", {
  id: integer("id").primaryKey(),
  role: roleEnum().$default(() => "admin")
})

export const AdminsRelations = relations(adminTable, ({ one }) => ({
  admin: one(userTable, {
    fields: [adminTable.id],
    references: [userTable.id],
  })
}))
