import React from 'react';
import Cardview from './Cardview';

export default function Community({ account }) {
  const items = [
    {
      title: "쓰임은 없지만, 이쁨이 쓰임인 미러볼 구매후기",
      author: "김셰프",
      createdAt: "2분 전",
      view: 100,
      reply: 0,
      image: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
    },
    {
      title: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
      author: "김셰프",
      createdAt: "3시간 전",
      view: 999,
      reply: 99,
      image: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
    },
    {
      title: "동해물과 백두산이 마르고 닳도록 하느님이",
      author: "김셰프",
      createdAt: "2025.05.01",
      view: 999999,
      reply: 999,
      image: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
    },
    {
      title: "동해물과 백두산이 마르고 닳도록 하느님이",
      author: "김셰프",
      createdAt: "2025.01.01",
      view: 999999999,
      reply: 9999,
      image: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
    }
  ];
  return (
    <>
      <div>
        {`닉네임: ${account.fullName}, 이메일: ${account.email}`}
      </div>
      <Cardview items={items} />
    </>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 0
};

export const query = `
  query Query {
    account: currentCustomer {
      uuid
      fullName
      email
    }
  }
`;