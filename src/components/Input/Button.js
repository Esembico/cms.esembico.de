import React from 'react';

export default function Button({ children, type, className, ...other }) {
  return (
    <div className='button-container'>
      <button
        type='button'
        className={`${type || 'primary'} ${className}`}
        {...other}
      >
        {children}
      </button>
    </div>
  );
}
