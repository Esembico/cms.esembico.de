import React from 'react';
import { ContainerProps } from '../types/components';

export default function Container({ children }: ContainerProps): JSX.Element {
  return <div className='container'>{children}</div>;
}
