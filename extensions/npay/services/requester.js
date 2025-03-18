const { default: axios } = require('axios');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');
const { getApiBaseUrls } = require('@evershop/npay/services/getApiBaseUrls');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

async function createAxiosInstance(request) {
  const { base } = await getApiBaseUrls();
  const clientId = await getSetting('npayClientId', '');
  const clientSecret = await getSetting('npayClientSecret', '');
  const chainId = await getSetting('npayChainId', '');
  const axiosInstance = axios.create({
    baseURL: base,
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
      'X-NaverPay-Chain-Id': chainId,
      'Content-Type': 'application/json'
    }
  });

  if (request) {
    axiosInstance.interceptors.request.use(async (config) => {
      return config;
    });
  }
  return axiosInstance;
}

module.exports.createAxiosInstance = createAxiosInstance;
