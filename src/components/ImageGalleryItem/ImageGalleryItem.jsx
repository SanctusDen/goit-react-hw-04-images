import React from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  onClick,
  largeImageURL,
}) => {
  return (
    <GalleryItem onClick={() => onClick({ tags, largeImageURL })}>
      <img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
