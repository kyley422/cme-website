CREATE TYPE "content"."image_type" AS ENUM('image/png', 'image/jpeg');--> statement-breakpoint
ALTER TABLE "content"."image" ADD COLUMN "type" "content"."image_type" DEFAULT 'image/png' NOT NULL;