import React from 'react';

export default function Header({ children }) {
  return (
    <React.Fragment>
      <h1>{children}</h1>
      <hr />
    </React.Fragment>
  );
}
