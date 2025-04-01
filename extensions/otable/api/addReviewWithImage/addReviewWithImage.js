const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const {
  startTransaction,
  rollback,
  commit,
  insert
} = require('@evershop/postgres-query-builder');

module.exports = async function graphql(request, response, delegate, next) {
  const {
    body: { product_id, customer_name, rating, comment, images }
  } = request;
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    // Make sure rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Insert the comment into the database
    const review = await insert('product_review')
      .given({
        product_id,
        rating,
        customer_name,
        comment
      })
      .execute(connection);
    
    await Promise.all(
      images.map((f, index) =>
        (async () => {
          await insert('product_review_image')
            .given({ origin_image: f, is_main: index === 0 })
            .prime('review_image_review_id', review.insertId)
            .execute(connection);
        })()
      )
    );

    await commit(connection);
    response.$body = {
      data: review
    };
    next();
  } catch (error) {
    await rollback(connection);
    next(error);
  }
};
