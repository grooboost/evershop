import React from 'react';

const Card = ({ title, author, createdAt, view, reply, image }) => {
  const formatNumber = (num) => new Intl.NumberFormat().format(num);
  return (<div style={{alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: "8px",}}>
    <div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: "12px",}}>
        <div style={{flex: "1", position: "relative", lineHeight: "20px", fontWeight: "600",}}>{title}</div>
        <img style={{width: "60px", height: "60px", objectFit: "cover",}} alt="" src={image} />
    </div>
    <div style={{alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: "0px", fontSize: "12px", color: "#9e9e9e",}}>
        <div style={{alignSelf: "stretch", flex: "1", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "4px",}}>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>{author}</div>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>·</div>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>{createdAt}</div>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>·</div>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>조회 {formatNumber(view)}</div>
        </div>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
            <div style={{position: "relative", lineHeight: "16px", fontWeight: "500",}}>댓글 {formatNumber(reply)}</div>
        </div>
    </div>
  </div>);
}


const Divider = () => <div style={{alignSelf: "stretch", backgroundColor: "#eee", height: "1px",}} />

const Cardview = ({items}) => {
  return (
    <div style={{width: "100%", position: "relative", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", padding: "24px 20px", boxSizing: "border-box", gap: "16px", textAlign: "left", fontSize: "16px", color: "#212121", fontFamily: "Pretendard",}}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Card title={item.title} author={item.author} createdAt={item.createdAt} view={item.view} reply={item.reply} image={item.image} />
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};


export default Cardview;
