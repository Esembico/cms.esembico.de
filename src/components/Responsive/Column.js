import React from 'react';

export default function Column({ children, width }) {
  return <div className={`col col-${width}`}>{children}</div>;
}
