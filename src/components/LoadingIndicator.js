import React from 'react';
import HashLoader from 'react-spinners/HashLoader';

export default function LoadingIndicator({ show }) {
  return (
    <React.Fragment>
      {show && (
        <div
          style={{ margin: '40px auto 0 auto', width: '0px', height: '40px' }}
        >
          <HashLoader color='white' size={80}></HashLoader>
        </div>
      )}
    </React.Fragment>
  );
}
