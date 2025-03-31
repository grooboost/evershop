const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    `CREATE TABLE "product_review_image" (
  "review_image_id" INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  "review_image_review_id" INT NOT NULL,
  "origin_image" varchar NOT NULL,
  "thumb_image" varchar NOT NULL,
  "listing_image" varchar NOT NULL,
  "single_image" varchar NOT NULL,
  "is_main" boolean DEFAULT false,
  CONSTRAINT "FK_PRODUCT_REVIEW_IMAGE_LINK" FOREIGN KEY ("review_image_review_id") REFERENCES "product_review" ("review_id") ON DELETE CASCADE
)`
  );
  await execute(
    connection,
    `CREATE INDEX "FK_PRODUCT_REVIEW_IMAGE_LINK" ON "product_review_image" ("review_image_review_id")`
  );
};
