import React from 'react';
import ChevronRight from '@evershop/otable/assets/icons/ChevronRight';
import ScheduleStep1 from '@evershop/otable/assets/icons/ScheduleStep1';
import ScheduleStep2 from '@evershop/otable/assets/icons/ScheduleStep2';
import ScheduleStep3 from '@evershop/otable/assets/icons/ScheduleStep3';

const HomeSchedulMobile = ({ onAction }) => {
  	return (
    		<div style={{width: "100%", position: "relative", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "72px 24px", boxSizing: "border-box", maxWidth: "992px", textAlign: "left", fontSize: "14px", color: "#ff6741", fontFamily: "Pretendard",}}>
      			<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "24px",}}>
        				<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "12px",}}>
          					<div style={{borderRadius: "10px", backgroundColor: "rgba(255, 103, 65, 0.1)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "10px 12px",}}>
            						<div style={{position: "relative", lineHeight: "14px", fontWeight: "600",}}>주문 및 배송 과정</div>
          					</div>
          					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "26px", color: "#3a3a3a",}}>
            						<b style={{position: "relative", lineHeight: "33.8px",}}>
              							<p style={{margin: "0",}}>다음주 준비를 위해</p>
              							<p style={{margin: "0",}}>금요일 아침까지</p>
              							<p style={{margin: "0",}}>보내드려요</p>
            						</b>
          					</div>
        				</div>
        				<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "20px", color: "#6b7280",}}>
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
            						<div style={{flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                								<div style={{position: "relative", lineHeight: "14px", fontWeight: "600",}}>매주 금요일</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                								<b style={{position: "relative", lineHeight: "27px",}}>일주일 집밥 예약 오픈</b>
              							</div>
            						</div>
            						<div style={{width: "96px", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "72px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px", boxSizing: "border-box",}}>
              							<div style={{alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0px 2px",}}>
                              <ScheduleStep1 />
              							</div>
            						</div>
          					</div>
          					<div style={{alignSelf: "stretch", position: "relative", borderTop: "1px solid #e5e7eb", boxSizing: "border-box", height: "1px", overflow: "hidden", flexShrink: "0",}} />
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
            						<div style={{flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                								<div style={{position: "relative", lineHeight: "14px", fontWeight: "600",}}>차주 수요일까지</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                								<b style={{position: "relative", lineHeight: "27px",}}>예약 마감 및 확정</b>
              							</div>
            						</div>
            						<div style={{width: "96px", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "4px 7px", boxSizing: "border-box",}}>
                          <ScheduleStep2 />
            						</div>
          					</div>
          					<div style={{alignSelf: "stretch", position: "relative", borderTop: "1px solid #e5e7eb", boxSizing: "border-box", height: "1px", overflow: "hidden", flexShrink: "0",}} />
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
            						<div style={{flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                								<div style={{position: "relative", lineHeight: "14px", fontWeight: "600",}}>금요일 아침</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                								<b style={{position: "relative", lineHeight: "27px",}}>
                  									<p style={{margin: "0",}}>새벽 배송으로</p>
                  									<p style={{margin: "0",}}>집 앞 도착</p>
                								</b>
              							</div>
            						</div>
            						<div style={{width: "96px", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 0px", boxSizing: "border-box",}}>
                          <ScheduleStep3 />
            						</div>
          					</div>
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "52px 0px 0px", textAlign: "center", fontSize: "18px", color: "#fff",}}>
            						<div style={{width: "342px", boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", borderRadius: "10px", backgroundColor: "#3a3a3a", height: "74px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", maxWidth: "343px", cursor: "pointer",}} onClick={onAction}>
              							<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
                								<b style={{position: "relative", lineHeight: "18px",}}>오디너리테이블과 함께하는 일주일</b>
              							</div>
              							<ChevronRight fill={'#ffffff'} />
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default HomeSchedulMobile;
