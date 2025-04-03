import React from 'react';
import HomeGalleryCard from './HomeGalleryCard';

const HomeGallery = ({title, subtitle, items}) => {
  return (
      <div style={{width: "100%", position: "relative", backgroundColor: "#f5f5f7", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "56px 10px 96px", boxSizing: "border-box", gap: "32px", textAlign: "center", fontSize: "18px", color: "#cd8f50", fontFamily: "Pretendard",}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "12px",}}>
              <div style={{width: "195.5px", position: "relative", borderBottom: "2px solid #cd8f50", boxSizing: "border-box", height: "26px",}}>
                  <div style={{position: "absolute", top: "-0.75px", left: "calc(50% - 97.75px)", lineHeight: "25.2px", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center", width: "195.8px", height: "26px",}}>{title}</div>
              </div>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontSize: "26px", color: "#3a3a3a",}}>
                  <b style={{alignSelf: "stretch", position: "relative", lineHeight: "33.8px",}}>
                      <p style={{margin: "0", whiteSpace: "pre-line"}}>{subtitle}</p>
                  </b>
              </div>
          </div>
          <div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",}}>
              
                <div style={{ width: '100%', overflowX: 'auto', paddingTop: '12px', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="scroll-hidden">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '10px', flexWrap: 'nowrap', flexDirection: 'column' }}>
                            <div style={{alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: "10px",}}>
                                {items.filter((_, i) => i % 2 == 0).map((item, index) => <HomeGalleryCard key={index} item={item}/>)}
                            </div>
                            <div style={{alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", gap: "10px",}}>
                                {items.filter((_, i) => i % 2 == 1).map((item, index) => <HomeGalleryCard key={index} item={item}/>)}
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>);
};

export default HomeGallery;
