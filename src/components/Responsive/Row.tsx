import React from 'react';
import { RowProps } from '../types/components';

export default function Row({ children }: RowProps): JSX.Element {
  return <div className='row'>{children}</div>;
}
