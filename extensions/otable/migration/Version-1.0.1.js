const { execute } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(
    connection,
    `CREATE TABLE "cms_variable" (
    "cms_variable_id" INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid (),
    "name" varchar NOT NULL,
    "data" jsonb NOT NULL default '{}'::jsonb,
    "status" boolean DEFAULT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CMS_VARIABLE_UUID" UNIQUE ("uuid"),
    CONSTRAINT "CMS_VARIABLE_NAME" UNIQUE ("name")
)`
  );
};
