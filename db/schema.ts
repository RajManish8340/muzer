import { serial, text, pgTable, pgEnum, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const roleEnum = pgEnum("role", ["normal", "admin"])

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text('name').notNull(),
  email: text("email").notNull(),
  role: roleEnum().default("normal").notNull()
})

export const adminTable = pgTable("admins", {
  id: integer("id").primaryKey().references(() => userTable.id),
  role: roleEnum().$default(() => "admin")
})


export const AdminsRelations = relations(adminTable, ({ one }) => ({
  user: one(userTable, {
    fields: [adminTable.id],
    references: [userTable.id],
  })
}))

export const roomTable = pgTable("rooms", {
  id: serial("id").primaryKey(),
  admin: integer("admin_id").references(() => adminTable.id),
  users: integer("user_id").references(() => userTable.id).array(),
  playlist: integer("playlist_id").references(() => playlistTable.id),
  currentPlaying: text("playing_id")
})

export const songTable = pgTable("songs", ({
  id: text().primaryKey(),
  createdBy: serial("use_id").references(() => userTable.id),
  upvotes: integer("upvotes")
}))

export const playlistTable = pgTable("playlist ", {
  id: text().references(() => songTable.id).array(),

})

