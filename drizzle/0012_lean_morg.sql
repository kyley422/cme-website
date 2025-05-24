ALTER TABLE "content"."schedule" ADD COLUMN "interval" interval minute;
UPDATE "content"."schedule" SET "interval" = "end" - "start";
ALTER TABLE "content"."schedule" ALTER COLUMN "interval" SET NOT NULL;
