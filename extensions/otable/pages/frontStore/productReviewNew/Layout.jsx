import React from 'react';
import Area from '@components/common/Area';
import Divider from '@evershop/otable/assets/Divider';

export default function ProductReviewNewPageLayout() {
  return (
    <div className="product-detail">
      <div style={{ paddingTop: '4rem' }}>
        <Area id="productPageTop" className="product-page-top" />
      </div>
      <div className="product-page-middle page-width grid grid-cols-1 gap-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Area id="productPageMiddleLeft" />
          <Area id="productPageMiddleRight" />
        </div>
      </div>
      <div className="product-page-middle page-width grid grid-cols-1 pt-12 gap-12">
        <Divider />
        <Area id="productPageBottom" />
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
