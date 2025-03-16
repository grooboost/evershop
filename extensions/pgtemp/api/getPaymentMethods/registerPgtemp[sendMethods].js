const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response) => {
  // Check if Pgtemp is enabled
  const pgtempConfig = getConfig('system.pgtemp', {});
  let pgtempStatus;
  if (pgtempConfig.status) {
    pgtempStatus = pgtempConfig.status;
  } else {
    pgtempStatus = await getSetting('pgtempPaymentStatus', 0);
  }
  if (parseInt(pgtempStatus, 10) === 1) {
    return {
      methodCode: 'pgtemp',
      methodName: await getSetting('pgtempDislayName', 'Pgtemp')
    };
  } else {
    return null;
  }
};
