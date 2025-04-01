const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { insert } = require('@evershop/postgres-query-builder');

module.exports = async function graphql(request, response, delegate, next) {
  try {
    const {
      body: { product_id, customer_name, rating, comment }
    } = request;

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
      .execute(pool);
    
    /**
    {
      review_id: 22,
      uuid: '6d5215f1-5128-4e40-9877-be90a2afab92',
      product_id: 12,
      customer_name: 'test',
      rating: 5,
      comment: 'test',
      approved: false,
      created_at: 2025-03-31T05:47:33.154Z,
      insertId: 22
    }
    */
   // TODO: 사용자가 업로드한 이미지를 등록
    const images = ["https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"];
    await Promise.all(
      images.map((f, index) =>
        (async () => {
          await insert('product_review_image')
            .given({ origin_image: f, is_main: index === 0 })
            .prime('review_image_review_id', review.insertId)
            .execute(pool);
        })()
      )
    );

    response.$body = {
      data: review
    };
    next();
  } catch (error) {
    next(error);
  }
};
