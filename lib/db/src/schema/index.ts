import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const siteData = pgTable("site_data", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("Unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectRequests = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  businessType: text("business_type").notNull().default(""),
  requestedService: text("requested_service").notNull().default(""),
  budget: text("budget").notNull().default(""),
  description: text("description").notNull().default(""),
  websiteLink: text("website_link").notNull().default(""),
  preferredStartDate: text("preferred_start_date").notNull().default(""),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("New"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type SiteDataRow = typeof siteData.$inferSelect;
export type ContactMessageRow = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
export type ProjectRequestRow = typeof projectRequests.$inferSelect;
export type NewProjectRequest = typeof projectRequests.$inferInsert;
