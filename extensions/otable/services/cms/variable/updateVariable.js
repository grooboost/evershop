const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  update,
  select
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('@evershop/evershop/src/modules/base/services/getAjv');
const variableDataSchema = require('./variableDataSchema.json');

function validateVariableDataBeforeInsert(data) {
  const ajv = getAjv();
  variableDataSchema.required = ['status'];
  const jsonSchema = getValueSync('updateVariableDataJsonSchema', variableDataSchema);
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function updateVariableData(uuid, data, connection) {
  const query = select().from('cms_variable');
  const variable = await query.where('uuid', '=', uuid).load(connection);

  if (!variable) {
    throw new Error('Requested variable not found');
  }
  const newVariable = await update('cms_variable')
    .given(data)
    .where('uuid', '=', uuid)
    .execute(connection);

  Object.assign(variable, newVariable);

  return {
    ...variable
  };
}

/**
 * Update variable service. This service will update a variable with all related data
 * @param {String} uuid
 * @param {Object} data
 * @param {Object} context
 */
async function updateVariable(uuid, data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const variableData = await getValue('variableDataBeforeUpdate', data);
    // Validate variable data
    validateVariableDataBeforeInsert(variableData);

    // Insert variable data
    const variable = await hookable(updateVariableData, { ...context, connection })(
      uuid,
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

module.exports = async (uuid, data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const variable = await hookable(updateVariable, context)(uuid, data, context);
  return variable;
};
