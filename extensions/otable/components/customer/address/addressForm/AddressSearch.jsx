import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export function AddressSearch({
  display,
  onClose,
  onSearch,
}) {
  const elementWrapRef = useRef(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const foldDaumPostcode = () => {
    onClose();
  };

  /**
   * data example
    {
      "address": "경기 수원시 영통구 광교호수공원로 80",
      "addressEnglish": "80 Gwanggyohosugongwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
      "addressType": "R",
      "apartment": "Y",
      "autoJibunAddress": "",
      "autoJibunAddressEnglish": "",
      "autoRoadAddress": "",
      "autoRoadAddressEnglish": "",
      "bcode": "4111710200",
      "bname": "원천동",
      "bname1": "",
      "bname1English": "",
      "bname2": "원천동",
      "bname2English": "Woncheon-dong",
      "bnameEnglish": "Woncheon-dong",
      "buildingCode": "4111710200105930000000003",
      "buildingName": "광교아이파크",
      "hname": "",
      "jibunAddress": "경기 수원시 영통구 원천동 593",
      "jibunAddressEnglish": "593 Woncheon-dong, Yeongtong-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
      "noSelected": "N",
      "postcode": "",
      "postcode1": "",
      "postcode2": "",
      "postcodeSeq": "",
      "query": "광교 아이파크",
      "roadAddress": "경기 수원시 영통구 광교호수공원로 80",
      "roadAddressEnglish": "80 Gwanggyohosugongwon-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
      "roadname": "광교호수공원로",
      "roadnameCode": "3350755",
      "roadnameEnglish": "Gwanggyohosugongwon-ro",
      "sido": "경기",
      "sidoEnglish": "Gyeonggi-do",
      "sigungu": "수원시 영통구",
      "sigunguCode": "41117",
      "sigunguEnglish": "Yeongtong-gu Suwon-si",
      "userLanguageType": "K",
      "userSelectedType": "R",
      "zonecode": "16514"
    }
   */
  const execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        onSearch(data);
        foldDaumPostcode();
      },
      onresize: function (size) {
        elementWrapRef.current.style.height = `${size.height + 10}px`;
      },
      width: '100%',
      height: '100%',
    }).embed(elementWrapRef.current);
  };

  useEffect(() => {
    if (display) {
      execDaumPostcode();
    }
  }, [display])

  const displayStyle = display? 'block': 'none';
  return (      
    <div style={{
      display: displayStyle,
      border: '1px solid transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div
        id="wrap"
        ref={elementWrapRef}
        style={{
          display: displayStyle,
          border: '1px solid transparent',
          width: '100%',
          height: '454px',
          marginTop: '5px',
          marginBottom: '-48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          id="btnFoldWrap"
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '0px',
            top: '-1px',
            zIndex: 1,
            border: '1px solid transparent',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          onClick={foldDaumPostcode}
          alt="접기 버튼"
        />
      </div>
    </div>
  );
}

AddressSearch.propTypes = {
  display: PropTypes.bool,
  onClose: PropTypes.func.isRequired, // Setting onClose as required
  onSearch: PropTypes.func.isRequired // Setting onSearch as required
};

AddressSearch.defaultProps = {
  display: false, // default false unless specified
};
