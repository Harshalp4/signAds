CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`attachment_key` text,
	`attachment_name` text,
	`created_at` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`request_key` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enquiries_request_key_unique` ON `enquiries` (`request_key`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_rate_expiry` ON `rate_limits` (`expires_at`);