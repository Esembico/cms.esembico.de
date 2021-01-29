import { MutableRefObject, useEffect } from 'react';

export function useOutsideAlerter(
  ref: MutableRefObject<HTMLElement>,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  callback: any
): void {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
