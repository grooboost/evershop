import PropTypes from 'prop-types';
import React from 'react';
import ReviewMediaManager from '@evershop/otable/components/reviewEdit/media/ReviewMediaManager';
import { Card } from '@components/admin/cms/Card';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function Media({ id, review, reviewImageUploadUrl }) {
  const image = review?.image;
  let gallery = review?.gallery || [];

  if (image) {
    gallery = [image].concat(gallery);
  }
  return (
    <Card title={_("Media")}>
      <Card.Session>
        <ReviewMediaManager
          id={id || 'images'}
          reviewImages={gallery}
          reviewImageUploadUrl={reviewImageUploadUrl}
        />
      </Card.Session>
    </Card>
  );
}

Media.propTypes = {
  id: PropTypes.string,
  review: PropTypes.shape({
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ),
    image: PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  }),
  reviewImageUploadUrl: PropTypes.string.isRequired
};

Media.defaultProps = {
  id: 'images',
  review: null
};
