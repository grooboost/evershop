import React from 'react';
import ChevronRight from '@evershop/otable/assets/icons/ChevronRight';
import HomeReviewCardView from './HomeReviewCardView';

const HomeReviews = ({ onOpenReviews, onOpenStart }) => {
  	return (
    		<div style={{width: "100%", position: "relative", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "72px 0px", boxSizing: "border-box", gap: "12px", textAlign: "center", fontSize: "26px", color: "#3a3a3a", fontFamily: "Pretendard",}}>
      			<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
        				<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
          					<b style={{alignSelf: "stretch", position: "relative", lineHeight: "33.8px",}}>
            						<p style={{margin: "0",}}>일주일 플랜을 시작하니</p>
            						<p style={{margin: "0",}}>남는 식재료 걱정없이 집밥했어요!</p>
          					</b>
        				</div>
      			</div>
      			<div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "12px", textAlign: "left", fontSize: "18px", color: "#1f2937",}}>
        				<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
          					<b style={{position: "relative", lineHeight: "27px",}}>
            						<span>{`후기 `}</span>
            						<span style={{color: "#ff6741",}}>1,004+</span>
          					</b>
        				</div>
        				<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
          					<b style={{position: "relative", lineHeight: "27px",}}>
            						<span>{`평균 만족도 `}</span>
            						<span style={{color: "#ff6741",}}>4.9</span>
          					</b>
        				</div>
      			</div>
                <HomeReviewCardView />
      			<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "12px 0px 0px", gap: "12px", fontSize: "16px",}}>
        				<div style={{width: "343px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "1px solid #3a3a3a", boxSizing: "border-box", height: "60px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", maxWidth: "343px", cursor: "pointer",}} onClick={onOpenReviews}>
          					<div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "10px",}}>
            						<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
              							<div style={{position: "relative", lineHeight: "24px", fontWeight: "600",}}>후기 보러가기</div>
            						</div>
            						<ChevronRight fill={'#3a3a3a'} />
          					</div>
        				</div>
        				<div style={{width: "343px", boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", borderRadius: "10px", backgroundColor: "#3a3a3a", height: "60px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", maxWidth: "343px", fontSize: "18px", color: "#fff", cursor: "pointer",}} onClick={onOpenStart}>
          					<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
            						<b style={{position: "relative", lineHeight: "18px",}}>일주일 플랜 시작하기</b>
          					</div>
          					<ChevronRight fill={'#ffffff'} />
        				</div>
      			</div>
    		</div>);
};

export default HomeReviews;