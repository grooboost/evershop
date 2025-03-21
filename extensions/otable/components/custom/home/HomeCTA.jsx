import React from 'react';
import ChevronRight from '@evershop/otable/assets/icons/ChevronRight';

const HomeCTA = () => {
  return (
      <div style={{width: "100%", position: "relative", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "72px 0px", boxSizing: "border-box", textAlign: "center", fontSize: "18px", color: "#fff", fontFamily: "Pretendard",}}>
          <div style={{width: "343px", boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", borderRadius: "10px", backgroundColor: "#3a3a3a", height: "60px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", maxWidth: "343px",}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
                  <b style={{position: "relative", lineHeight: "18px",}}>일주일 집밥 바로 구매하기</b>
              </div>
              <ChevronRight fill={'#ffffff'} />
          </div>
      </div>);
};

export default HomeCTA;
