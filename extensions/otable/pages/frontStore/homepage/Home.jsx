import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import Button from '@components/common/form/Button';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import HomeBanner from '@evershop/otable/components/custom/home/HomeBanner';
import HomeReviews from '@evershop/otable/components/custom/home/HomeReviews';
import HomeGallery from '@evershop/otable/components/custom/home/HomeGallery';
import HomeSchedule from '@evershop/otable/components/custom/home/HomeSchedule';
import HomeScheduleMobile from '@evershop/otable/components/custom/home/HomeScheduleMobile';
import HomeCTA from '@evershop/otable/components/custom/home/HomeCTA';

export default function Home({ continueShoppingUrl }) {
  return (
    <div
      style={{
        width: '100vw',          // 화면 너비에 딱 맞게
        overflow: 'hidden',      // 넘치는 자식은 잘림
        boxSizing: 'border-box', // padding 고려
      }}
    >
      <HomeBanner />
      <HomeReviews />
      <HomeGallery title={`다음주 레시피`} subtitle={`식재료 남김 없이,\n건강한 집밥 플랜하세요!`} />
      <div className="hidden md:block"><HomeSchedule /></div>
      <div className="block md:hidden"><HomeScheduleMobile /></div>      
      <HomeGallery title={`일주일 집밥 식재료들`} subtitle={`제철인 냉이와 봄미나리,\n싱싱하게 보내드려요~`} />
      <HomeCTA />
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
  }
`;
