import { useRef } from 'react';
import { useOutsideAlerter } from '../../helpers/hooks';

import '../../css/Dialog.css';

export default function Dialog({ open, onHide, children }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    onHide();
  });
  return (
    <div className={`dialog-overlay ${open ? 'show' : ''}`}>
      <div ref={wrapperRef} className='dialog'>
        {children}
      </div>
    </div>
  );
}
