import React from 'react';

const HomeBanner = () => {
  return (
      <div style={{width: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "left", fontSize: "16px", color: "#fff", fontFamily: "Pretendard",}}>
          <img style={{width: "1920px", position: "absolute", margin: "0", left: "calc(50% - 960px)", overflow: "hidden", flexShrink: "0", objectFit: "cover", maxWidth: "1920px", zIndex: "0",}} alt="" src="https://grooboost-public.s3.amazonaws.com/public/homebanner.jpg" />
          <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "96px 0px 103px 20px", boxSizing: "border-box", gap: "19px", maxWidth: "828px", zIndex: "1",}}>
              <div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                  <div style={{alignSelf: "stretch", position: "relative", lineHeight: "16px", fontWeight: "500",}}>쉬운 집밥의 시작,</div>
              </div>
              <div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "34px", color: "#3a3a3a",}}>
                  <b style={{alignSelf: "stretch", position: "relative", letterSpacing: "-0.68px", lineHeight: "49px",}}>
                      <p style={{margin: "0",}}>오디너리테이블</p>
                      <p style={{margin: "0",}}>일주일 집밥 배송</p>
                  </b>
              </div>
              <div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "5px 0px 0px", textAlign: "center", fontSize: "18px",}}>
                  <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                      <div style={{width: "100%", borderRadius: "10px", backgroundColor: "#3a3a3a", height: "50px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "15.8px 58.9px 16.3px", boxSizing: "border-box",}}>
                          <b style={{flex: "1", position: "relative", lineHeight: "18px",}}>시작하기</b>
                      </div>
                  </div>
              </div>
          </div>
      </div>);
};

export default HomeBanner;
