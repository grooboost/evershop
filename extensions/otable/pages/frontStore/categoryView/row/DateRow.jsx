import React from 'react';
import PropTypes from 'prop-types';

function DateRow({ date }) {
  // KST로 설정하고 원하는 포맷으로 날짜를 표시
  const formattedDate = date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <td>
      {formattedDate}
    </td>
  );
}

DateRow.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

export default DateRow;

