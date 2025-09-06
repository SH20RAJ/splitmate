CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`avatar_url` text,
	`created_at` integer,
	`updated_at` integer
);

CREATE TABLE `groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`currency` text DEFAULT '₹' NOT NULL,
	`category` text DEFAULT 'General' NOT NULL,
	`monthly_budget` real,
	`status` text DEFAULT 'active' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `group_members` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`joined_at` integer,
	PRIMARY KEY(`group_id`, `user_id`),
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`amount` real NOT NULL,
	`currency` text DEFAULT '₹' NOT NULL,
	`category` text DEFAULT 'Other' NOT NULL,
	`paid_by_id` text NOT NULL,
	`receipt_url` text,
	`split_type` text DEFAULT 'equal' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`expense_date` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`paid_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `expense_participants` (
	`id` text PRIMARY KEY NOT NULL,
	`expense_id` text NOT NULL,
	`user_id` text NOT NULL,
	`share_amount` real NOT NULL,
	`share_percentage` real,
	`is_paid` integer DEFAULT false NOT NULL,
	`created_at` integer,
	PRIMARY KEY(`expense_id`, `user_id`),
	FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`from_user_id` text NOT NULL,
	`to_user_id` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT '₹' NOT NULL,
	`description` text,
	`method` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`transaction_id` text,
	`payment_date` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`to_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `activities` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`description` text NOT NULL,
	`metadata` text,
	`created_at` integer,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon` text,
	`color` text DEFAULT '#6366f1' NOT NULL,
	`is_default` integer DEFAULT false NOT NULL,
	`created_at` integer
);

CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`category_id` text,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`period` text DEFAULT 'monthly' NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);

-- Create indexes
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE INDEX `users_email_idx` ON `users` (`email`);
CREATE INDEX `groups_created_by_idx` ON `groups` (`created_by`);
CREATE INDEX `groups_status_idx` ON `groups` (`status`);
CREATE INDEX `group_members_group_id_idx` ON `group_members` (`group_id`);
CREATE INDEX `group_members_user_id_idx` ON `group_members` (`user_id`);
CREATE INDEX `expenses_group_id_idx` ON `expenses` (`group_id`);
CREATE INDEX `expenses_paid_by_id_idx` ON `expenses` (`paid_by_id`);
CREATE INDEX `expenses_status_idx` ON `expenses` (`status`);
CREATE INDEX `expenses_category_idx` ON `expenses` (`category`);
CREATE INDEX `expenses_expense_date_idx` ON `expenses` (`expense_date`);
CREATE INDEX `expense_participants_expense_id_idx` ON `expense_participants` (`expense_id`);
CREATE INDEX `expense_participants_user_id_idx` ON `expense_participants` (`user_id`);
CREATE INDEX `payments_group_id_idx` ON `payments` (`group_id`);
CREATE INDEX `payments_from_user_id_idx` ON `payments` (`from_user_id`);
CREATE INDEX `payments_to_user_id_idx` ON `payments` (`to_user_id`);
CREATE INDEX `payments_status_idx` ON `payments` (`status`);
CREATE INDEX `activities_group_id_idx` ON `activities` (`group_id`);
CREATE INDEX `activities_user_id_idx` ON `activities` (`user_id`);
CREATE INDEX `activities_type_idx` ON `activities` (`type`);
CREATE INDEX `activities_created_at_idx` ON `activities` (`created_at`);
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);
CREATE INDEX `categories_name_idx` ON `categories` (`name`);
CREATE INDEX `budgets_group_id_idx` ON `budgets` (`group_id`);
CREATE INDEX `budgets_category_id_idx` ON `budgets` (`category_id`);
