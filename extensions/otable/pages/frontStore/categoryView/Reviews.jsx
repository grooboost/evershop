import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './Reviews.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Review from './Review';

export default function Reviews({ homeUrl, category }) {
  const reviews = category.products.items.flatMap(i => i.reviews);
  const [colCount, setColCount] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) { // md: 768px 이상
        setColCount(3);
      } else if (window.innerWidth >= 640) { // sm: 640px 이상
        setColCount(2);
      } else {
        setColCount(1);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 렌더링 시에도 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onOpenReview = async (sku) => {
    window.location.href = `${homeUrl}store/vegebox/${sku}`
  }

  const renderCardsColumn = (reviews) => {
    return (
      <div className="flex flex-col gap-6">
        {reviews.map((r, i) => (
          <div key={i} style={{cursor: "pointer",}} onClick={() => onOpenReview(r.product.sku)}>
            <Review review={r} />
          </div>
        ))}
      </div>
    )
  }

  const renderCardsColumns = (reviews, colCount) => {
    // 열 수에 따라 그룹 배열 생성
    const columns = Array.from({ length: colCount }, (_, colIndex) => (
      <div key={colIndex}>
        {renderCardsColumn(reviews.filter((_, i) => i % colCount === colIndex))}
      </div>
    ));
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ display: '0px 0px 40px 0px'  }}>
        {columns}
      </div>
    );
  }
  

  return renderCardsColumns(reviews, colCount);
}

Reviews.propTypes = {
  category: PropTypes.shape({
    categoryId: PropTypes.number,
    products: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          reviews: PropTypes.arrayOf(
            PropTypes.shape({
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
          )
        })
      )
    })
  }),
};

Reviews.defaultProps = {
  category: {
    categoryId: 0,
    products: {
      items: []
    }
  }
};

export const layout = {
  areaId: 'reviews',
  sortOrder: 40
};

export const query = `
  query Query($categoryId: Int!, $filters: [FilterInput]) {
    homeUrl: url(routeId: "homepage")
    category: category(id: $categoryId) {
      categoryId
      products (filters: $filters) {
        items {
          reviews {
            createdAt
            reviewId
            rating
            customerName
            comment
            image {
              alt
              origin
            }
            product {
              productId
              uuid
              name
              sku
            }
          }
        }
      }
    }
  }`;

export const variables = `
{
  categoryId: getContextValue('categoryId'),
  filters: getContextValue('filtersFromUrl'),
}`;
