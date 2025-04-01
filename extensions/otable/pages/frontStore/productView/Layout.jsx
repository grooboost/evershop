import React from 'react';
import Area from '@components/common/Area';

export default function ProductPageLayout() {
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
      <div className="product-page-middle page-width grid grid-cols-1">
        <div style={{ paddingTop: '4rem', paddingBottom: '4rem', marginTop: '4rem', marginBottom: '4rem', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}>
          <Area id="productPageContentBody" />
        </div>
        <Area id="productPageBottom" />
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
