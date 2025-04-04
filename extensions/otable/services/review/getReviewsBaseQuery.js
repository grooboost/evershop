const { select } = require('@evershop/postgres-query-builder');

module.exports.getReviewsBaseQuery = () => {
  const query = select('*').from('product_review');
  query
    .leftJoin('product')
    .on('product.product_id', '=', 'product_review.product_id');
  query
    .leftJoin('product_description')
    .on(
      'product_description.product_description_product_id',
      '=',
      'product.product_id'
    );

  query
    .leftJoin('product_review_image')
    .on('product_review_image.review_image_review_id', '=', 'product_review.review_id')
    .and('product_review_image.is_main', '=', true);

  // join 과정에서 충돌하는 컬럼들 보정
  query.select('product_review.uuid', 'uuid');
  query.select('product_review.created_at', 'created_at');

  return query;
};
