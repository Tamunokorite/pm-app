import { 
  sqliteTable, 
  text, 
  integer, 
  real,
  blob,
  uniqueIndex,
  primaryKey
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  profilePicture: text('profile_picture'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export const organizations = sqliteTable('organizations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  logoUrl: text('logo_url'),
  domain: text('domain'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export const organizationMembers = sqliteTable('organization_members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  organizationId: integer('organization_id').references(() => organizations.id),
  role: text('role', { 
    enum: ['owner', 'admin', 'member', 'viewer'] 
  }).default('member'),
  status: text('status').default('active'),
  joinedAt: integer('joined_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`),
  lastActive: integer('last_active', { mode: 'timestamp' })
}, (table) => ({
  uniqIdx: uniqueIndex('org_user_unique').on(table.userId, table.organizationId)
}));

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  organizationId: integer('organization_id')
    .references(() => organizations.id).notNull(),
  status: text('status', { 
    enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'] 
  }).default('planning'),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  createdById: integer('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id')
    .references(() => projects.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { 
    enum: ['todo', 'in_progress', 'under_review', 'done'] 
  }).default('todo'),
  assignedToId: integer('assigned_to_id').references(() => users.id),
  createdById: integer('created_by_id')
    .references(() => users.id).notNull(),
  priority: integer('priority').default(0),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
});

export const invitations = sqliteTable('invitations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  organizationId: integer('organization_id')
    .references(() => organizations.id).notNull(),
  invitedById: integer('invited_by_id')
    .references(() => users.id).notNull(),
  role: text('role', { 
    enum: ['owner', 'admin', 'member', 'viewer'] 
  }).default('member'),
  status: text('status').default('pending'),
  token: text('token').unique().notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
});

// Relationship Definitions
export const userRelations = relations(users, ({ many }) => ({
  organizationMemberships: many(organizationMembers),
  createdProjects: many(projects),
  assignedTasks: many(tasks, { relationName: 'assigned_tasks' }),
  createdTasks: many(tasks, { relationName: 'created_tasks' })
}));

export const organizationRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  projects: many(projects)
}));

export const organizationMemberRelations = relations(organizationMembers, ({ one }) => ({
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id]
  }),
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id]
  })
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id]
  }),
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id]
  }),
  tasks: many(tasks)
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id]
  }),
  assignedTo: one(users, {
    fields: [tasks.assignedToId],
    references: [users.id],
    relationName: 'assigned_tasks'
  }),
  createdBy: one(users, {
    fields: [tasks.createdById],
    references: [users.id],
    relationName: 'created_tasks'
  })
}));