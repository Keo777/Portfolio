import React from 'react';

const ReflectiveText = ({ text }) => {
  return (
    <div className='container'>
      <div className='reflection'>{text}</div>
      <div className='text'>{text}</div>
    </div>
  );
};

export default ReflectiveText;