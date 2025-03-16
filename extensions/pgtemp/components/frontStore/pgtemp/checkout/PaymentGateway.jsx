// TODO: Refactoring
import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Elements 컨텍스트 생성
const ElementsContext = createContext(null);

// ElementsProvider 컴포넌트: 자식 컴포넌트에게 Elements 인스턴스를 제공
export const ElementsProvider = ({ children }) => {
  const PG_API_KEY = 'your_pg_secret_key';
  const PG_API_BASE = 'https://api.pg.com/v1';
  
  const getHeaders = () => ({
    Authorization: `Bearer ${PG_API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  const submit = async (paymentMethodId) => {
    return {};
    // 결제 시작 전에 해당 아이디를 PG에 등록
    // try {
    //   const response = await axios.post(
    //     `${PG_API_BASE}/payment_intents/${paymentIntentId}/confirm`,
    //     `payment_method=${paymentMethodId}`,
    //     { headers: getHeaders() }
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error('Error confirming payment:', error.response.data);
    //   return null;
    // }
  };

  const elementsInstance = {
    instance: {
      submit,
    }
  };

  return (
    <ElementsContext.Provider value={elementsInstance}>
      {children}
    </ElementsContext.Provider>
  );
};

export const Elements = ({ pgPublishableKey, options, children }) => {
  return (
    <ElementsProvider>
      <div className="pg__form">
        {children}
      </div>
    </ElementsProvider>
  );
};

// 결제 방법 선택 시 PG 전용 위젯 노출 부분
export const PaymentElement = ({ id, children }) => {
  return (
    <div className="pg__form">
      {children}
    </div>
  );
};

// useElements 훅: Elements 인스턴스를 사용할 수 있게 함
const useElements = () => {
  const context = useContext(ElementsContext);
  if (!context) {
    throw new Error('useElements must be used within a ElementsProvider');
  }
  return context.instance;
};

// 사용자 정의 usePaymentGateway 훅
const usePaymentGateway = () => {

  const [oPay, setOPay] = useState(null);

  useEffect(() => {
    // 네이버페이 SDK 동적 로드
    const script = document.createElement("script");
    script.src = "https://nsp.pay.naver.com/sdk/js/naverpay.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Naver && window.Naver.Pay) {
        const payInstance = window.Naver.Pay.create({
          mode: "development", // 개발환경 (production으로 변경 가능)
          clientId: "HN3GGCMDdTgGUfl0kFCo",
          chainId: "MkxnQ2luV2dFZ1p",
        });
        setOPay(payInstance);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState(null);

  // TODO: PG 콜백으로 처리하기 테스트
  const sendTestCallback = () => {
    setTimeout(() => {
      const callbackPath = `${returnUrl}?order_id=${orderId}`;
      console.log('Execute test redirect to', callbackPath)
      window.location.href = callbackPath;
    }, 1000);    
  }

  /**
   * 
    {
      clientSecret,
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: billingAddress.fullName,
            email: result.data.cart.customerEmail,
            phone: billingAddress.telephone,
            address: {
              line1: billingAddress.address1,
              country: billingAddress.country.code,
              state: billingAddress.province?.code,
              postal_code: billingAddress.postcode,
              city: billingAddress.city
            }
          }
        },
        return_url: `${returnUrl}?order_id=${orderId}`
      }
    }
   */
  const confirmPayment = async ({clientSecret, elements, confirmParams}) => {
    const { return_url } = confirmParams;
    if (!oPay) {
      alert("네이버페이 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    console.log('return_url', return_url);
    oPay.open({
      merchantPayKey: "20250317B2sFiH",
      productName: "상품명",
      productCount: "1",
      totalPayAmount: "100",
      taxScopeAmount: "100",
      taxExScopeAmount: "0",
      returnUrl: return_url,
    });

    // TODO: 실제 처리 결과에 따라 값 생성
    const result = {
      clientSecret,
    };

    if (result && !result.error) {
      setPaymentIntent(result);
    } else {
      setError(result.error);
    }
    return result;
  };

  // PG 연동전 내부 워크플로우 확인용으로만 사용
  // sendTestCallback();

  return {
    paymentIntent,
    error,
    confirmPayment
  };
};

// Exporting individual hooks and components from pg-js and react-pg-js
export {
  usePaymentGateway,
  useElements
};
