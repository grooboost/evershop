import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@components/common/form/Form';
import { Field } from '@components/common/form/Field';
import Button from '@components/common/form/Button';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Media from './Media';
import StartIcon from '@heroicons/react/solid/esm/StarIcon';
import './Rating.scss';

export default function ReviewForm({ action, product, reviewImageUploadUrl, account }) {
  const [error, setError] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSuccess = (response) => {
    if (!response.error) {
      setIsSubmitted(true);
    } else {
      setError(response.error.message);
    }
  };

  const rate = (score) => {
    setRating(score);
  };

  return (
    <div className="product-comment-form">
      {isSubmitted && (
        <div className="success text-success">
          {_('Your review has been submitted successfully!')}
        </div>
      )}
      {!isSubmitted && (
        <div className='flex flex-col gap-8'>
          <h3>{_('Your comment')}</h3>
          {error && <div className="error text-critical">{error}</div>}
            <Form
              id="comment-form"
              action={action}
              method="POST"
              onSuccess={onSuccess}
              isJSON
              submitBtn={false}
              onStart={() => {
                setLoading(true);
              }}
              onComplete={() => {
                setLoading(false);
              }}
              dataFilter={(formData) => {
                if (formData.images === undefined) {
                  // eslint-disable-next-line no-param-reassign
                  formData.images = [];
                }
                return formData;
              }}
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                  <Media reviewImageUploadUrl={reviewImageUploadUrl} />
                </div>
                <div className='col-span-2'>
                  <label htmlFor="rating">{_('Your Rating')}</label>
                  <div className="rating__stars">
                    {[...Array(5)].map((e, i) => (
                      <a
                        key={i}
                        className=""
                        href="#"
                        onClick={(element) => {
                          element.preventDefault();
                          rate(i + 1);
                        }}
                      >
                        <StartIcon
                          width={20}
                          height={20}
                          fill={rating > i ? '#ff5501' : '#989898'}
                        />
                      </a>
                    ))}
                  </div>
                  <Field
                    type="hidden"
                    name="rating"
                    value={rating}
                    validationRules={['required']}
                  />
                  <input type="hidden" name="customer_name" value={account.fullName}/>
                  <Field
                    name="comment"
                    label={_("Your Comment")}
                    type="textarea"
                    validationRules={['notEmpty']}
                  />
                  <Field type="hidden" name="product_id" value={product.productId} />
                </div>
              </div>
            </Form>
            <Button
              title={_("Submit review")}
              onAction={() => {
                document
                  .getElementById('comment-form')
                  .dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  );
              }}
              isLoading={loading}
            />
          </div>
      )}
    </div>
  );
}

ReviewForm.propTypes = {
  action: PropTypes.string.isRequired,
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired
  }).isRequired,
  reviewImageUploadUrl: PropTypes.string.isRequired,
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
  }).isRequired
};

export const layout = {
  areaId: 'productPageBottom',
  sortOrder: 50
};

export const query = `
  query {
    action: url(routeId: "addReviewWithImage"),
    product: product(id: getContextValue("productId")) {
      productId
    }
    reviewImageUploadUrl: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    account: currentCustomer {
      uuid
      fullName
      email
    }
  }
`;
