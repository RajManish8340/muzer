import { serial, text, pgTable, pgEnum, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const roleEnum = pgEnum("role", ["normal", "admin"])

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text('name').notNull(),
  email: text("email").notNull(),
  role: roleEnum().default("normal").notNull()
})

export const roomTable = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  adminId: integer("admin_id").references(() => userTable.id).notNull(),
  playlist: integer("playlist_id").references(() => playlistTable.id),
  currentPlaying: text("playing_id")
})

export const roomMembersTable = pgTable("room_members", {
  userId: integer("user_id").references(() => userTable.id).notNull(),
  roomId: integer("room_id").references(() => roomTable.id).notNull()
}, (table) => [
  primaryKey({ columns: [table.roomId, table.userId] })
])

export const songTable = pgTable("songs", ({
  id: text().primaryKey(),
  title: text(),
}))

export const playlistTable = pgTable("playlist ", {
  id: serial("id").primaryKey(),
  name: text("name").default("My Playlist").notNull(),
})

export const PlaylistSongsTable = pgTable("playlist_songs", {
  playlistId: integer("playlist_id").references(() => playlistTable.id),
  songId: text("song_id").references(() => songTable.id),
  createdBy: integer("use_id").references(() => userTable.id),
}, (table) => [
  primaryKey({ columns: [table.playlistId, table.songId, table.createdBy,] })
])

export const RoomPlaylistSongsTable = pgTable("room_playlist_songs", {
  roomId: integer("room_id").references(() => roomTable.id),
  playlistId: integer("playlist_id").references(() => playlistTable.id),
  songId: text("song_id").references(() => songTable.id),
  downvotes: integer("downvotes").default(0),
  upvotes: integer("upvotes").default(0),
}, (table) => [
  primaryKey({ columns: [table.playlistId, table.songId, table.roomId] })
])
