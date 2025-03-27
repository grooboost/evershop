import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import Area from '@components/common/Area';
import Button from '@components/common/form/Button';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import HomeBanner from '@evershop/otable/components/custom/home/HomeBanner';
import HomeReviews from '@evershop/otable/components/custom/home/HomeReviews';
import HomeGallery from '@evershop/otable/components/custom/home/HomeGallery';
import HomeSchedule from '@evershop/otable/components/custom/home/HomeSchedule';
import HomeScheduleMobile from '@evershop/otable/components/custom/home/HomeScheduleMobile';
import HomeCTA from '@evershop/otable/components/custom/home/HomeCTA';

export default function Home({ continueShoppingUrl, cartUrl, emptifyMineCart, addMineCartItem }) {
  const onStartDelivery = async () => {
    try {
      await axios.post(emptifyMineCart);
      const response = await axios.post(
        addMineCartItem,
        {
          sku: 'wmeal-250301',
          qty: 1
        }
      );
      window.location.href = cartUrl;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        width: '100vw',          // 화면 너비에 딱 맞게
        overflow: 'hidden',      // 넘치는 자식은 잘림
        boxSizing: 'border-box', // padding 고려
      }}
    >
      <HomeBanner onAction={onStartDelivery}/>
      <HomeReviews onAction={onStartDelivery}/>
      <HomeGallery title={`다음주 레시피`} subtitle={`식재료 남김 없이,\n건강한 집밥 플랜하세요!`} />
      <div className="hidden md:block"><HomeSchedule onAction={onStartDelivery}/></div>
      <div className="block md:hidden"><HomeScheduleMobile onAction={onStartDelivery}/></div>      
      <HomeGallery title={`일주일 집밥 식재료들`} subtitle={`제철인 냉이와 봄미나리,\n싱싱하게 보내드려요~`} />
      <HomeCTA onAction={onStartDelivery}/>
    </div>
  );
}


Home.propTypes = {
  continueShoppingUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 0
};

export const query = `
  query Query {
    continueShoppingUrl: url(routeId: "homepage")
    cartUrl: url(routeId: "cart")
    emptifyMineCart: url(routeId: "emptifyMineCart")
    addMineCartItem: url(routeId: "addMineCartItem")
  }
`;
