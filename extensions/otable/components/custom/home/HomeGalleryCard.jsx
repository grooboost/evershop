import React from 'react';

const HomeGalleryCard = ({item}) => {
  return (
    <div style={{width: "100px", position: "relative", borderRadius: "8px", backgroundColor: "#e0e0e0", height: "96px", overflow: "hidden", flexShrink: "0",}} >
      {item?.img_small && <img src={item.img_small} />}
    </div>
  );
};

export default HomeGalleryCard;
