import {
  integer,
  text,
  boolean,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const todo = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
