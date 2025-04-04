export const getKSTDateString = () => {
  const now = new Date();
  const kstDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  return kstDate.toISOString().split('T')[0].replace(/-/g, '');
};

// 날짜 포맷 변경 함수
export const formatDate = (epoch) => {
  const date = new Date(parseInt(epoch, 10));
  // 한국 시간대로 설정
  const kstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  return `${kstDate.getFullYear()}.${kstDate.getMonth() + 1}.${kstDate.getDate()}`;
};

// const formatDate = (epochMs) => {
//   const date = new Date(epochMs)
//   const formattedDate = date.toLocaleString("ko-KR", {
//     timeZone: "Asia/Seoul",
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
//   });
//   return formattedDate;
// }

// 이름 마스킹 함수
export const maskName = (name) => {
  if (name.length > 1) {
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  }
  return name;  // 이름이 한 글자일 경우 마스킹하지 않음
};