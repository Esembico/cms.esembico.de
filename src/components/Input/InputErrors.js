import React from 'react';

export default function InputErrors({ errors }) {
  return (
    <React.Fragment>
      {errors && (
        <React.Fragment>
          {Array.isArray(errors) ? (
            <React.Fragment>
              {errors.map((error, i) => {
                return (
                  <span className='error' key={i}>
                    {error}
                  </span>
                );
              })}
            </React.Fragment>
          ) : (
            <span className='error'>{errors}</span>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
