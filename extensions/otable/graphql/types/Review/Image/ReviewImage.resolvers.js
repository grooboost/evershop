const { v4: uuidv4 } = require('uuid');
const { select } = require('@evershop/postgres-query-builder');

module.exports = {
  Review: {
    image: async (review) => {
      const mainImage = review.originImage;
      return mainImage
        ? {
            thumb: review.thumbImage || null,
            single: review.singleImage || null,
            listing: review.listingImage || null,
            alt: review.name,
            url: mainImage,
            uuid: uuidv4(),
            origin: mainImage
          }
        : null;
    },
    gallery: async (review, _, { pool }) => {
      const gallery = await select()
        .from('product_review_image')
        .where('review_image_review_id', '=', review.reviewId)
        .and('is_main', '=', false)
        .execute(pool);
      return gallery.map((image) => ({
        id: image.review_image_id,
        alt: review.name,
        url: image.origin_image,
        uuid: uuidv4(),
        origin: image.origin_image,
        thumb: image.thumb_image,
        single: image.single_image,
        listing: image.listing_image
      }));
    }
  }
};
