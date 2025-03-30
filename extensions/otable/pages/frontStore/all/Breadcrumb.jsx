import React from 'react';
import PropTypes from 'prop-types';

function Breadcrumb({ pageInfo: { breadcrumbs } }) {
  return null;
}

Breadcrumb.propTypes = {
  pageInfo: PropTypes.shape({
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string
      })
    )
  }).isRequired
};

export const query = `
  query query {
    pageInfo {
      breadcrumbs {
        title
        url
      }
    }
  }
`;

export const layout = {
  areaId: 'content',
  sortOrder: 0
};

export default Breadcrumb;
