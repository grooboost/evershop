import React from 'react';
import ChevronRight from '@evershop/otable/assets/icons/ChevronRight';
import ScheduleStep1 from '@evershop/otable/assets/icons/ScheduleStep1';
import ScheduleStep2 from '@evershop/otable/assets/icons/ScheduleStep2';
import ScheduleStep3 from '@evershop/otable/assets/icons/ScheduleStep3';

const HomeSchedule = ({ onAction }) => {
  	return (
    		<div style={{width: "100%", position: "relative", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "72px 0px", boxSizing: "border-box", textAlign: "left", fontSize: "14px", color: "#ff6741", fontFamily: "Pretendard",}}>
      			<div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", padding: "0px 10px", gap: "24px", maxWidth: "944px",}}>
        				<div style={{alignSelf: "stretch", flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "12px",}}>
          					<div style={{borderRadius: "10px", backgroundColor: "rgba(255, 103, 65, 0.1)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "10px 12px",}}>
            						<div style={{position: "relative", lineHeight: "14px", fontWeight: "600",}}>주문 및 배송 과정</div>
          					</div>
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "26px", color: "#3a3a3a",}}>
            						<b style={{position: "relative", lineHeight: "33.8px",}}>
              							<p style={{margin: "0",}}>다음주 준비를 위해</p>
              							<p style={{margin: "0",}}>주말 아침까지</p>
              							<p style={{margin: "0",}}>보내드려요</p>
            						</b>
          					</div>
        				</div>
        				<div style={{alignSelf: "stretch", width: "621.3px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "24px", color: "#6b7280",}}>
          					<div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: "16px",}}>
            						<div style={{alignSelf: "stretch", width: "196.4px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "16px",}}>
              							<div style={{alignSelf: "stretch", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "88px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "8px 50.2px", boxSizing: "border-box",}}>
                								<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: "196.45px",}}>
                  									<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
                    										<div style={{overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0px 2px",}}>
                      											<ScheduleStep1 />
                    										</div>
                  									</div>
                								</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                  									<div style={{alignSelf: "stretch", position: "relative", lineHeight: "14px", fontWeight: "600",}}>매주 월요일</div>
                								</div>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                  									<b style={{alignSelf: "stretch", position: "relative", lineHeight: "27px",}}>일주일 집밥 예약 오픈</b>
                								</div>
              							</div>
            						</div>
            						<div style={{alignSelf: "stretch", width: "196.4px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "16px",}}>
              							<div style={{alignSelf: "stretch", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "88px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "8px 50.2px", boxSizing: "border-box",}}>
                								<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: "196.45px",}}>
                  									<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
                                      <ScheduleStep2 />
                                    </div>
                								</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                  									<div style={{alignSelf: "stretch", position: "relative", lineHeight: "14px", fontWeight: "600",}}>매주 목요일까지</div>
                								</div>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                  									<b style={{alignSelf: "stretch", position: "relative", lineHeight: "27px",}}>예약 마감 및 확정</b>
                								</div>
              							</div>
            						</div>
            						<div style={{alignSelf: "stretch", width: "196.4px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "16px",}}>
              							<div style={{alignSelf: "stretch", borderRadius: "24px", backgroundColor: "#f5f5f7", height: "88px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "8px 50.2px", boxSizing: "border-box",}}>
                								<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: "196.45px",}}>
                  									<div style={{width: "96px", height: "72px", overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
                                      <ScheduleStep3 />
                                    </div>
                								</div>
              							</div>
              							<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "6px",}}>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                  									<div style={{alignSelf: "stretch", position: "relative", lineHeight: "14px", fontWeight: "600",}}>매주 주말 아침</div>
                								</div>
                								<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", fontSize: "18px", color: "#3a3a3a",}}>
                  									<b style={{alignSelf: "stretch", position: "relative", lineHeight: "27px",}}>
                    										<p style={{margin: "0",}}>지정한 요일에</p>
                    										<p style={{margin: "0",}}>집 앞 도착</p>
                  									</b>
                								</div>
              							</div>
            						</div>
          					</div>
          					<div style={{width: "621.3px", boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.15)", borderRadius: "10px", backgroundColor: "#3a3a3a", height: "74px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", textAlign: "center", fontSize: "18px", color: "#fff", cursor: "pointer",}} onClick={onAction}>
            						<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
              							<b style={{position: "relative", lineHeight: "18px",}}>오디너리테이블과 함께하는 일주일</b>
            						</div>
                        <ChevronRight fill={'#ffffff'} />
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default HomeSchedule;
