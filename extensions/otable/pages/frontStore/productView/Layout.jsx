import React from 'react';
import Area from '@components/common/Area';

export default function ProductPageLayout() {
  return (
    <div className="product-detail">
      <Area id="productPageTop" className="product-page-top" />
      <div className="product-page-middle page-width grid grid-cols-1 gap-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-24">
            <Area id="productPageMiddleLeft" />
            <Area id="productPageMiddleBottom" className="hidden md:block" />
          </div>
          <Area id="productPageMiddleRight" />
        </div>
        <Area id="productPageMiddleBottom" className="block md:hidden" />
      </div>
      <Area id="productPageBottom" className="product-page-top" />
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
