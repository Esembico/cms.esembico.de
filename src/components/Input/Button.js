import React from 'react';

export default function Button({ children, color, className, ...other }) {
  return (
    <div className='button-container'>
      <button
        type='button'
        className={`contained ${color || 'primary'} ${className || ''}`}
        {...other}
      >
        {children}
      </button>
    </div>
  );
}
