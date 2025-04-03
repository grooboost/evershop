const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  startTransaction,
  commit,
  rollback,
  select,
  del
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');

async function deleteVariableData(uuid, connection) {
  await del('cms_variable').where('uuid', '=', uuid).execute(connection);
}
/**
 * Delete variable service. This service will delete a variable with all related data
 * @param {String} uuid
 * @param {Object} context
 */
async function deleteVariable(uuid, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const query = select().from('cms_variable');

    const variable = await query.where('uuid', '=', uuid).load(connection);
    if (!variable) {
      throw new Error('Invalid variable id');
    }
    await hookable(deleteVariableData, { ...context, variable, connection })(
      uuid,
      connection
    );
    await commit(connection);
    return variable;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const variable = await hookable(deleteVariable, context)(uuid, context);
  return variable;
};
