import React from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, onClick, largeImageURL }) => {
  return (
    <GalleryItem onClick={() => onClick({ tags, largeImageURL })}>
      <img src={largeImageURL} alt={tags} />
    </GalleryItem>
  );
};
