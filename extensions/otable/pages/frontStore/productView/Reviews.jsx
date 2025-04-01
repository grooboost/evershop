import React from 'react';
import PropTypes from 'prop-types';
import './Reviews.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Rating from '@evershop/otable/components/Rating';
import { maskName, formatDate } from '@evershop/otable/utils/format';

export default function Reviews({ product: { reviews = [] } }) {
  return (
    <div id="product__reviews" className="mt-2">
      <h3>{_('Customer Reviews')}</h3>
      <ul className="review__list">
        {reviews.length === 0 && (
          <li className="flex flex-col gap-1">
            {_('Be the first to review this product')}
          </li>
        )}
        {reviews.map((review) => (
          <li key={review.uuid} className="flex flex-col gap-4" style={{ color: '#3a3a3a' }}>
            <div className='flex gap-4'>
              <div className="rating">
                <Rating rating={review.rating} />
              </div>
              <div style={{ fontWeight: '400' }}>{maskName(review.customerName)}</div>
              <div style={{ fontWeight: '200', color: '#6b7280', fontSize: 12 }}>{formatDate(review.createdAt)}</div>
            </div>
            <div className='flex gap-8'>
              {review.image?.origin && <div>
                <img src={review.image.origin} style={{ minWidth: "120px", maxHeight: "100px" }} />
              </div>}
              <div className="flex flex-col gap-1" >
                {review.comment}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

Reviews.propTypes = {
  product: PropTypes.shape({
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        customerName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        image: PropTypes.shape({
          alt: PropTypes.string,
          origin: PropTypes.string
        })
      })
    )
  }).isRequired
};

export const layout = {
  areaId: 'productPageBottom',
  sortOrder: 45
};

export const query = `
  query {
    product(id: getContextValue("productId")) {
      reviews {
        reviewId
        uuid
        rating
        customerName
        comment
        createdAt
        image {
          alt
          origin
        }
      }
    }
  }
`;
