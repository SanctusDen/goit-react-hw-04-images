import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={largeImageURL}
          largeImageURL={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      ))}
    </Gallery>
  );
};
