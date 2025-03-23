import React from 'react';
import HomeReviewCard from './HomeReviewCard';

const HomeReviewCardView = () => {
  return (<div style={{ width: '100%', overflowX: 'auto', padding: '12px 12px', scrollbarWidth: 'none'}}>
    <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'nowrap', textAlign: "left", fontSize: "14px", color: "#ff6741",}}>
            <HomeReviewCard author={`유*빈`} date={`2024.12.21`} text={`첫 구매인데 정말 만족스러워요. 일주일 플랜 덕분에 집밥을 꾸준히 챙겨 먹게 되고, 아침도 든든히 먹고 출근합니다.`}/>
            <HomeReviewCard author={`쿠*`} date={`2025.1.20`} text={`된장찌개를 끓이면서 남은 두부까지 활용했어요. 플랜에 맞춰 딱 필요한 재료만 쓰니까 버릴 걱정도 없고, 설명도 알기 쉽게 되어 있어서 좋았어요.`}/>
            <HomeReviewCard author={`밍*이`} date={`2025.2.4`} text={`어묵탕에 청경채도 넣어봤는데, 조합이 의외로 잘 어울리더라고요. 쌀쌀한 날씨에 따뜻하게 먹기 좋은 메뉴였어요.`}/>
            <HomeReviewCard author={`김*프`} date={`2025.3.2`} text={`일주일 플랜 따라 반찬을 미리 준비하니 매일 집밥 먹는 게 훨씬 쉬워졌어요. 남는 재료 없이 알차게 쓰는 기분도 꽤 괜찮네요.`}/>
        </div>
    </div>
  </div>);
};

export default HomeReviewCardView;
