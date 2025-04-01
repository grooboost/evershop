import React from 'react';
import PropTypes from 'prop-types';

function CommentRow({ image, comment }) {
  return (
    <td>
      <div className='flex gap-4'>
        {image && <div style={{minWdith: '50px', maxWidth: '50px'}}>
          <img src={image} />
        </div>}
        <div style={{flexGrow: 1}}>
          {comment}
        </div>
      </div>
    </td>
  );
}

CommentRow.propTypes = {
  comment: PropTypes.string.isRequired
};

export default CommentRow;
