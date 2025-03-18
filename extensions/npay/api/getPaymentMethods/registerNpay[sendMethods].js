const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response) => {
  // Check if Npay is enabled
  const npayConfig = getConfig('system.npay', {});
  let npayStatus;
  if (npayConfig.status) {
    npayStatus = npayConfig.status;
  } else {
    npayStatus = await getSetting('npayPaymentStatus', 0);
  }
  if (parseInt(npayStatus, 10) === 1) {
    return {
      methodCode: 'npay',
      methodName: await getSetting('npayDislayName', 'Npay')
    };
  } else {
    return null;
  }
};
