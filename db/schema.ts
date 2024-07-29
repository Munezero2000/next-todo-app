import { InferInsertModel, relations } from "drizzle-orm";
import { text, boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const todo = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdBy: uuid("author_id"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(todo),
}));

export const todosRelations = relations(todo, ({ one }) => ({
  author: one(users, {
    fields: [todo.createdBy],
    references: [users.id],
  }),
}));

export type NewUser = InferInsertModel<typeof users>;
