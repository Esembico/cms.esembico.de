import React from 'react';

export default function ImagePreview({ value, base }) {
  const imageUrl = new URL(value, base);
  return (
    <img
      className='responsive-image'
      src={imageUrl.href}
      onError={(e) => (e.target.style.display = 'none')}
      onLoad={(e) => (e.target.style.display = 'block')}
    ></img>
  );
}
