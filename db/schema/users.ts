import {pgTable, text, varchar, boolean, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['offline', 'online', 'away'])

export const users = pgTable("user", {
    id: uuid('id').primaryKey().defaultRandom(),
    // nickName: varchar('nick_name', {length: 50}).notNull().unique(),
    name: text("name"),
    email: varchar('email', {length: 255}).notNull().unique(),
    password: text('password'),
    // avatarURL: varchar('avatar_url', {length: 255}).notNull(),
    image: text("image"),
    // status: statusEnum().notNull().default('online'),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    // isReported: boolean('is_reported').notNull().default(false),
    // isActive: boolean('is_active').notNull().default(true),
    // isBlocked: boolean('is_blocked').notNull().default(false),
    // createdAT: timestamp('created_at').notNull().defaultNow()
})