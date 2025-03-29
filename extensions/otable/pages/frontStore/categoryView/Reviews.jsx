import PropTypes from 'prop-types';
import React from 'react';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Area from '@components/common/Area';
import BasicRow from '@components/common/grid/rows/BasicRow';
import SortableHeader from '@components/common/grid/headers/Sortable';
import DummyColumnHeader from '@components/common/grid/headers/Dummy';
import RatingRow from './row/RatingRow';
import CommentRow from './row/CommentRow';
import ProductRow from './row/ProductRow';
import DateRow from './row/DateRow';


export default function Reviews({ reviews }) {
  return (
    <div style={{padding: '0px 0px 40px 0px'}}>
      <table className="listing sticky">
        <thead>
          <tr>
            <Area
              className=""
              id="reviewGridHeader"
              noOuter
              coreComponents={[
                {
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Date"
                        name="createdAt"
                        currentFilters={reviews.currentFilters}
                      />
                    )
                  },
                  sortOrder: 1
                },
                {
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Product"
                        name="product"
                        currentFilters={reviews.currentFilters}
                      />
                    )
                  },
                  sortOrder: 2
                },
                {
                  component: {
                    default: () => <DummyColumnHeader title="Customer Name" />
                  },
                  sortOrder: 5
                },
                {
                  component: {
                    default: () => <DummyColumnHeader title="Comment" />
                  },
                  sortOrder: 10
                },
                {
                  component: {
                    default: () => (
                      <SortableHeader
                        title="Rating"
                        name="rating"
                        currentFilters={reviews.currentFilters}
                      />
                    )
                  },
                  sortOrder: 15
                }
              ]}
            />
          </tr>
        </thead>
        <tbody>
          {reviews.items.map((r, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i}>
              <Area
                className=""
                id="reviewGridRow"
                row={r}
                noOuter
                coreComponents={[
                  {
                    component: {
                      default: () => <DateRow date={new Date(parseInt(r.createdAt, 10))} />
                    },
                    sortOrder: 1
                  },
                  {
                    component: {
                      default: () => <ProductRow product={r.product} />
                    },
                    sortOrder: 5
                  },
                  {
                    component: {
                      default: ({ areaProps }) => (
                        <BasicRow areaProps={areaProps} id="customerName" />
                      )
                    },
                    sortOrder: 5
                  },
                  {
                    component: {
                      default: () => <CommentRow comment={r.comment} />
                    },
                    sortOrder: 10
                  },
                  {
                    component: {
                      default: () => <RatingRow rating={r.rating} />
                    },
                    sortOrder: 15
                  }
                ]}
              />
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
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
          name: PropTypes.string
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
    reviews (filters: $filters) {
      items {
        createdAt
        reviewId
        rating
        customerName
        comment
        product {
          name
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
