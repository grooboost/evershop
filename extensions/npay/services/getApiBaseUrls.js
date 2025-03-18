const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

module.exports.getApiBaseUrls = async function getApiBaseUrls() {
  const urlsJson = await getSetting('npayEnvironment', '{}');
  console.log('npayEnvironment', urlsJson);
  return JSON.parse(urlsJson);
};
