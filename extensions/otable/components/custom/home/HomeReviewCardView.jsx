import React from 'react';
import HomeReviewCard from './HomeReviewCard';

  // 날짜 포맷 변경 함수
  const formatDate = (epoch) => {
    const date = new Date(parseInt(epoch, 10));
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  // 이름 마스킹 함수
  const maskName = (name) => {
    if (name.length > 1) {
      return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    }
    return name;  // 이름이 한 글자일 경우 마스킹하지 않음
  };

const HomeReviewCardView = ({ reviews }) => {
  return (<div style={{ width: '100%', overflowX: 'auto', padding: '12px 12px', scrollbarWidth: 'none'}}>
    <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'nowrap', textAlign: "left", fontSize: "14px", color: "#ff6741",}}>
          {reviews.map(review => {
            return <HomeReviewCard key={review.reviewId} author={maskName(review.customerName)} date={formatDate(review.createdAt)} text={review.comment}/>
          })}
        </div>
    </div>
  </div>);
};

export default HomeReviewCardView;
