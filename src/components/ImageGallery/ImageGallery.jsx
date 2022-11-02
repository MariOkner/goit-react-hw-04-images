import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryHTML } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryHTML>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          smallImageURL={image.smallImageURL}
          largeImageURL={image.largeImageURL}
          onLargeImgClick={() => onClick(image.largeImageURL)}
        />
      ))}
    </ImageGalleryHTML>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      smallImageURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
