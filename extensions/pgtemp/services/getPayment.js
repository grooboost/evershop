// TODO: Refactoring
const axios = require('axios');
const { getSetting } = require('@evershop/evershop/src/modules/setting/services/setting');

class PaymentIntents {
  constructor(baseUrl, secretKey) {
    this.baseUrl = baseUrl;
    this.secretKey = secretKey;
  }

  async create({ amount, currency, metadata, automatic_payment_methods, capture_method }) {
    // Dummy implementation for example
    return {
      client_secret: 'test_client_seckey'
    };
    // 가정: 실제 API 호출로 PaymentIntent 생성
    // const response = await axios.post(`${this.baseUrl}/payments/intents`, {
    //   amount,
    //   currency,
    //   metadata,
    //   capture_method: capture_method === 'manual' ? 'MANUAL' : 'AUTO',
    //   automatic_payment_methods
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${this.secretKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // return {
    //   id: response.data.id,
    //   client_secret: response.data.client_secret,
    //   status: response.data.status,
    //   amount: response.data.amount,
    //   currency: response.data.currency,
    //   metadata: response.data.metadata
    // };
  }

  async retrieve(paymentIntentId) {
    // Dummy implementation for example
    // status: succeeded or requires_capture
    return {
      id: paymentIntentId,
      status: 'succeeded',
      amount: 100,
      currency: 'KRW',
      description: 'Mock payment intent for unit testing'
    };
    // const response = await axios.get(`${this.baseUrl}/payments/intents/${paymentIntentId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${this.secretKey}`
    //   }
    // });

    // return {
    //   id: response.data.id,
    //   status: response.data.status,
    //   amount: response.data.amount,
    //   currency: response.data.currency,
    //   description: response.data.description,
    //   metadata: response.data.metadata
    // };
  }

  // 결제 승인 내역 조회: https://developers.pay.naver.com/user/sand-box/payment/list
  async capture(paymentIntentId) {
    try {
      const response = await axios.post(
          'https://dev-pub.apis.naver.com/naverpay-partner/naverpay/payments/v2.2/apply/payment',
          new URLSearchParams({ paymentId: paymentIntentId }).toString(),
          {
              headers: {
                  'X-Naver-Client-Id': 'HN3GGCMDdTgGUfl0kFCo',
                  'X-Naver-Client-Secret': this.secretKey,
                  'X-NaverPay-Chain-Id': 'MkxnQ2luV2dFZ1p',
                  'X-NaverPay-Idempotency-Key': `${paymentIntentId}-capture`,
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
    return {};
  }

  async cancel(paymentIntentId) {
    return {};
  }
}

class Webhooks {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  constructEvent(payload, signature, endpointSecret) {
    // 여기에서 signature 검증 로직 추가
    if (signature !== this.secretKey || endpointSecret !== this.secretKey) {
      console.log('signature', signature);
      console.log('endpointSecret', endpointSecret);
      console.log('secretKey', this.secretKey);
      throw new Error('Webhook Error: Invalid signature');
    }
    // payload 파싱 후 이벤트 객체 반환
    const event = JSON.parse(payload);
    console.log('Webhooks.constructEvent', JSON.stringify(event));
    return event;
  }
}

class Refunds {
  constructor(baseUrl, secretKey) {
    this.baseUrl = baseUrl;
    this.secretKey = secretKey;
  }

  async create({ payment_intent_id, amount }) {
    const response = await axios.post(
      'https://dev-pub.apis.naver.com/naverpay-partner/naverpay/payments/v1/cancel',
      new URLSearchParams({ 
          paymentId: payment_intent_id,
          cancelAmount: 100,
          cancelReason: 'testCancel',
          cancelRequester: '2',
          taxScopeAmount: 100,
          taxExScopeAmount: 0,
      }).toString(),
      {
        headers: {
          'X-Naver-Client-Id': 'HN3GGCMDdTgGUfl0kFCo',
          'X-Naver-Client-Secret': this.secretKey,
          'X-NaverPay-Chain-Id': 'MkxnQ2luV2dFZ1p',
          'X-NaverPay-Idempotency-Key': `${payment_intent_id}-refund`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('Response:', response.data);
    // 더미 데이터 반환
    return {
      id: 'refund_123', // 가상의 환불 ID
      charge: 'charge_456', // 가상의 차지 ID
      amount: amount,
      currency: 'KRW'
    };
    // 가정: 실제 API 호출로 환불 생성
    // const response = await axios.post(`${this.baseUrl}/payments/refunds`, {
    //   payment_intent,
    //   amount
    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${this.secretKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // return {
    //   id: response.data.id,
    //   charge: response.data.charge_id,
    //   amount: response.data.amount,
    //   currency: response.data.currency
    // };
  }
}

class Charges {
  constructor(baseUrl, secretKey) {
    this.baseUrl = baseUrl;
    this.secretKey = secretKey;
  }

  async retrieve(chargeId) {
    // 더미 데이터 반환
    return {
      id: chargeId,
      refunded: true, // 가정: 환불 완료
      currency: 'KRW'
    };
    // 가정: 실제 API 호출로 결제 정보 조회
    // const response = await axios.get(`${this.baseUrl}/payments/charges/${chargeId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${this.secretKey}`
    //   }
    // });

    // return {
    //   id: response.data.id,
    //   refunded: response.data.refunded,
    //   currency: response.data.currency
    // };
  }
}

class NaverPay {
  constructor(secretKey) {
    this.secretKey = secretKey;
    this.baseUrl = 'https://api.naver.com';
    this.paymentIntents = new PaymentIntents(this.baseUrl, this.secretKey);
    this.webhooks = new Webhooks(this.secretKey);
    this.refunds = new Refunds(this.baseUrl, this.secretKey);
    this.charges = new Charges(this.baseUrl, this.secretKey);
  }
}

module.exports.getPaymentIntent = async (pgtempSecretKey) => {
  const pgtempConfig = await getSetting('pgtempConfig', {});
  return new NaverPay(pgtempSecretKey);
};
