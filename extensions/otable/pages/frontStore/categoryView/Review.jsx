import PropTypes from 'prop-types';
import React from 'react';
import './Reviews.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Rating from './Rating';
import { maskName, formatDate } from '@evershop/otable/utils/format';

export default function Review({ review }) {
  return (
    <div className="review-card col-span-1">
      <div style={{ backgroundColor: '#e0e0e0'}}>
        {review.image?.origin && <img src={review.image.origin} style={{ width: "100%"}} />}
      </div>
      <div className="review-card-inner" style={{ color: '#3a3a3a'}}>
        <div><Rating rating={review.rating} /></div>
        <div className="flex gap-4">
          <div style={{ fontWeight: '700' }}>{review.product.name}</div>
          <div style={{ fontWeight: '400', flexGrow: 1 }}>{maskName(review.customerName)}</div>
          <div style={{ fontWeight: '200', color: '#6b7280', fontSize: 12 }}>{formatDate(review.createdAt)}</div>
        </div>
        <div style={{ fontWeight: '400' }}>{review.comment}</div>
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    reviewId: PropTypes.number,
    rating: PropTypes.number,
    customerName: PropTypes.string,
    comment: PropTypes.string,
    image: PropTypes.shape({
      alt: PropTypes.string,
      origin: PropTypes.string
    }),
    product: PropTypes.shape({
      productId: PropTypes.number,
      uuid: PropTypes.string,
      name: PropTypes.string,
      sku: PropTypes.string
    })
  })
};
