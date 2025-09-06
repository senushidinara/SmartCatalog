import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  cognitiveProfile: jsonb("cognitive_profile").$type<{
    memory: number;
    focus: number;
    sleep: number;
    energy: number;
    mood: number;
  }>(),
  neuralPoints: integer("neural_points").default(0),
  tierLevel: text("tier_level").default("bronze"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(), // memory, focus, sleep, energy, mood, gadgets
  imageUrl: text("image_url"),
  neuralImpact: jsonb("neural_impact").$type<{
    memory?: number;
    focus?: number;
    sleep?: number;
    energy?: number;
    mood?: number;
  }>(),
  ingredients: text("ingredients").array(),
  inStock: boolean("in_stock").default(true),
  aiScore: integer("ai_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bundles = pgTable("bundles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }).notNull(),
  bundlePrice: decimal("bundle_price", { precision: 10, scale: 2 }).notNull(),
  productIds: text("product_ids").array().notNull(),
  predictedImpact: jsonb("predicted_impact").$type<{
    memory: number;
    focus: number;
    sleep: number;
    energy: number;
    mood: number;
  }>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  items: jsonb("items").$type<Array<{
    productId: string;
    quantity: number;
    price: number;
  }>>(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  predictedBrainImpact: jsonb("predicted_brain_impact").$type<{
    memory: number;
    focus: number;
    sleep: number;
    energy: number;
    mood: number;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const offers = pgTable("offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discountType: text("discount_type").notNull(), // percentage, fixed, bundle
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  productIds: text("product_ids").array(),
  isFlashDeal: boolean("is_flash_deal").default(false),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRewards = pgTable("user_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  activityType: text("activity_type").notNull(), // purchase, challenge, streak
  pointsEarned: integer("points_earned").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertBundleSchema = createInsertSchema(bundles).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  createdAt: true,
});

export const insertUserRewardSchema = createInsertSchema(userRewards).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Bundle = typeof bundles.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Offer = typeof offers.$inferSelect;
export type UserReward = typeof userRewards.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertBundle = z.infer<typeof insertBundleSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertOffer = z.infer<typeof insertOfferSchema>;
export type InsertUserReward = z.infer<typeof insertUserRewardSchema>;
