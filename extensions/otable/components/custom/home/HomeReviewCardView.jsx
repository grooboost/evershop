import React from 'react';
import HomeReviewCard from './HomeReviewCard';
import { maskName, formatDate } from '@evershop/otable/utils/format';
import './Custom.scss'

const HomeReviewCardView = ({ reviews }) => {
  return (<div className='scrollbar-hidden' style={{ width: '100%', overflowX: 'auto', padding: '12px 12px'}}>
    <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'nowrap', textAlign: "left", fontSize: "14px", color: "#ff6741",}}>
          {reviews.map(review => {
            return <HomeReviewCard key={review.reviewId} image={review.image} author={maskName(review.customerName)} date={formatDate(review.createdAt)} text={review.comment}/>
          })}
        </div>
    </div>
  </div>);
};

export default HomeReviewCardView;
