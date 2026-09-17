import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{id:text('id').primaryKey(),data:text('data').notNull(),attachmentKey:text('attachment_key'),attachmentName:text('attachment_name'),createdAt:text('created_at').notNull(),status:text('status').notNull().default('new'),requestKey:text('request_key').notNull().unique()});
export const content=sqliteTable('content',{id:text('id').primaryKey(),data:text('data').notNull(),updatedAt:text('updated_at').notNull()});
export const assets=sqliteTable('assets',{id:text('id').primaryKey(),data:text('data').notNull(),updatedAt:text('updated_at').notNull()});
export const rateLimits=sqliteTable('rate_limits',{key:text('key').primaryKey(),count:integer('count').notNull().default(1),expiresAt:integer('expires_at').notNull()},t=>[index('idx_rate_expiry').on(t.expiresAt)]);
