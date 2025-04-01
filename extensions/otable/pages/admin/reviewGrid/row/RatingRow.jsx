import PropTypes from 'prop-types';
import React from 'react';
import './Rating.scss';
import Rating from '@evershop/otable/components/Rating';

function RatingRow({ rating }) {
  return (
    <td>
      <Rating rating={rating} />
    </td>
  );
}

RatingRow.propTypes = {
  rating: PropTypes.number.isRequired
};

export default RatingRow;
