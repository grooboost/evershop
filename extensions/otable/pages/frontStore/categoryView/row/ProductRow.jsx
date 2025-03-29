import React from 'react';
import PropTypes from 'prop-types';

function ProductRow({ product }) {
  return (
    <td>
      {product.name}
    </td>
  );
}

ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default ProductRow;
