CREATE TYPE "content"."page" AS ENUM('home', 'about');--> statement-breakpoint
ALTER TABLE "content"."section" ADD COLUMN "page" "content"."page" NOT NULL;