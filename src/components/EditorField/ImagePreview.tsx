import React, { SyntheticEvent } from 'react';
import { ImagePreviewProps } from '../types/components';

export default function ImagePreview({
  value,
  base
}: ImagePreviewProps): JSX.Element {
  const imageUrl = new URL(value, base);
  return (
    <img
      className='responsive-image'
      src={imageUrl.href}
      onError={(e: SyntheticEvent<HTMLImageElement>) =>
        ((e.target as HTMLImageElement).style.display = 'none')
      }
      onLoad={(e: SyntheticEvent<HTMLImageElement>) =>
        ((e.target as HTMLImageElement).style.display = 'block')
      }
    ></img>
  );
}
