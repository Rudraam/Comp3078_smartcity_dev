import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().default(""),
  password: text("password").notNull(),
  phone: text("phone").notNull().default(""),
  location: text("location").notNull().default(""),
  bio: text("bio").notNull().default(""),
  preferredCity: text("preferred_city").notNull().default("Toronto"),
  notificationsEnabled: boolean("notifications_enabled").notNull().default(true),
  darkMode: boolean("dark_mode").notNull().default(true),
  role: text("role").notNull().default("regular"),
  avatar: text("avatar").notNull().default(""),
});

export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  address: text("address").notNull().default(""),
  city: text("city").notNull().default(""),
  website: text("website").notNull().default(""),
  phone: text("phone").notNull().default(""),
  additionalInfo: text("additional_info").notNull().default(""),
  status: text("status").notNull().default("pending"),
  adminNote: text("admin_note").notNull().default(""),
  reviewedBy: varchar("reviewed_by"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  reviewedAt: timestamp("reviewed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  username: text("username").notNull(),
  placeId: text("place_id").notNull(),
  placeName: text("place_name").notNull().default(""),
  placeType: text("place_type").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull().default(""),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertReviewSchema = z.object({
  placeId: z.string().min(1),
  placeName: z.string().optional().default(""),
  placeType: z.enum(["restaurant", "hotel"]),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional().default(""),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export const insertSubmissionSchema = z.object({
  type: z.enum(["restaurant", "hotel", "event"]),
  name: z.string().min(1),
  description: z.string().optional().default(""),
  address: z.string().optional().default(""),
  city: z.string().min(1),
  website: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  additionalInfo: z.string().optional().default(""),
});

export const updateProfileSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  preferredCity: z.string().optional(),
  notificationsEnabled: z.boolean().optional(),
  darkMode: z.boolean().optional(),
  avatar: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type User = typeof users.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type UserRole = "regular" | "commercial" | "admin";
