import React from 'react';

const HomeReviewCard = ({image, author, date, text}) => {
  return (
    <div style={{width: "239px", minWidth: "239px", height: "311.8px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
      <div style={{alignSelf: "stretch", borderRadius: "8px", border: "1px solid #e5e7eb", boxSizing: "border-box", height: "311.8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "21px 1px 1px", gap: "20px",}}>
        <div style={{alignSelf: "stretch", height: "89px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "0px 10px", boxSizing: "border-box", gap: "12px",}}>
            <div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
                <div style={{flex: "1", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start",}}>
                    <div style={{alignSelf: "stretch", position: "relative", lineHeight: "14px", fontWeight: "600",}}>{author}</div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center", fontSize: "12px", color: "#414b5a",}}>
                    <div style={{position: "relative", lineHeight: "12px",}}>{date}</div>
                </div>
            </div>
            <div style={{alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", color: "#414b5a",}}>
                <div style={{alignSelf: "stretch", position: "relative", lineHeight: "21px", fontWeight: "500", display: "-webkit-inline-box", overflow: "hidden", textOverflow: "ellipsis", WebkitLineClamp: "3", WebkitBoxOrient: "vertical",}}>{text}</div>
            </div>
        </div>
        <div style={{width: "100%", position: "relative", borderRadius: "0px 0px 8px 8px", backgroundColor: "#e0e0e0", height: "180.8px", overflow: "hidden", flexShrink: "0", maxWidth: "239px",}}>
          {image?.origin && <img src={image.origin} />}
        </div>
    </div>
  </div>);
};

export default HomeReviewCard;
