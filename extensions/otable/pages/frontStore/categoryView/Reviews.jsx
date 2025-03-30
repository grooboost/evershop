import PropTypes from 'prop-types';
import React from 'react';
import './Reviews.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Review from './Review';

export default function Reviews({ homeUrl, reviews }) {
  const onOpenReview = async (sku) => {
    window.location.href = `${homeUrl}store/vegebox/${sku}`
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ padding: '0px 0px 40px 0px' }}>
      {reviews.items.map((r, i) => (
        <div key={i} style={{cursor: "pointer",}} onClick={() => onOpenReview(r.product.sku)}>
          <Review review={r} />
        </div>
      ))}
    </div>
  );
}

Reviews.propTypes = {
  mod: PropTypes.string,
  reviews: PropTypes.shape({
    total: PropTypes.number,
    currentFilters: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        operation: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        reviewId: PropTypes.number,
        rating: PropTypes.number,
        customerName: PropTypes.string,
        comment: PropTypes.string,
        product: PropTypes.shape({
          productId: PropTypes.number,
          uuid: PropTypes.string,
          name: PropTypes.string,
          sku: PropTypes.string
        })
      })
    )
  })
};

Reviews.defaultProps = {
  reviews: {
    total: 0,
    currentFilters: [],
    items: []
  }
};

export const layout = {
  areaId: 'reviews',
  sortOrder: 40
};

export const query = `
  query Query($filters: [FilterInput]) {
    homeUrl: url(routeId: "homepage")
    reviews (filters: $filters) {
      items {
        createdAt
        reviewId
        rating
        customerName
        comment
        product {
          productId
          uuid
          name
          sku
        }
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }`;

export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;
