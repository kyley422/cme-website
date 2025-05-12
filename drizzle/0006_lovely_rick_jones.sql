CREATE TABLE "content"."image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data" "bytea" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content"."section_image" (
	"section" integer NOT NULL,
	"image" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content"."student" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"image" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "content"."instrument" ADD COLUMN "image" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "content"."section_image" ADD CONSTRAINT "section_image_section_section_id_fk" FOREIGN KEY ("section") REFERENCES "content"."section"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content"."section_image" ADD CONSTRAINT "section_image_image_image_id_fk" FOREIGN KEY ("image") REFERENCES "content"."image"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content"."student" ADD CONSTRAINT "student_image_image_id_fk" FOREIGN KEY ("image") REFERENCES "content"."image"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content"."instrument" ADD CONSTRAINT "instrument_image_image_id_fk" FOREIGN KEY ("image") REFERENCES "content"."image"("id") ON DELETE no action ON UPDATE no action;