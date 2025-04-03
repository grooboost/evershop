const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  insert
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('@evershop/evershop/src/modules/base/services/getAjv');
const variableDataSchema = require('./variableDataSchema.json');

function validateVariableDataBeforeInsert(data) {
  const ajv = getAjv();
  variableDataSchema.required = [
    'status',
    'name',
    'data',
  ];
  const jsonSchema = getValueSync('createVariableDataJsonSchema', variableDataSchema);
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function insertVariableData(data, connection) {
  const variable = await insert('cms_variable').given(data).execute(connection);

  return {
    ...variable
  };
}

/**
 * Create variable service. This service will create a variable with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function createVariable(data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const variableData = await getValue('variableDataBeforeCreate', data);
    // Validate variable data
    validateVariableDataBeforeInsert(variableData);

    // Insert variable data
    const variable = await hookable(insertVariableData, { ...context, connection })(
      variableData,
      connection
    );

    await commit(connection);
    return variable;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const variable = await hookable(createVariable, context)(data, context);
  return variable;
};
