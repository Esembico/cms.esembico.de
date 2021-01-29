import React from 'react';
import { ColumnProps } from '../types/components';

export default function Column({ children, width }: ColumnProps): JSX.Element {
  return <div className={`col col-${width}`}>{children}</div>;
}
