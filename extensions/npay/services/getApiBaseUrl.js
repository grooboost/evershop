const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

module.exports.getApiBaseUrl = async function getApiBaseUrl() {
  const url = await getSetting(
    'npayEnvironment',
    'https://dev-pub.apis.naver.com/naverpay-partner/naverpay/payments'
  );
  return url;
};
