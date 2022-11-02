import PropTypes from 'prop-types';
import { ItemHTML, ImgHTML } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ onLargeImgClick, smallImageURL }) => (
  <ItemHTML onClick={onLargeImgClick}>
    <ImgHTML src={smallImageURL} alt="" />
  </ItemHTML>
);

ImageGalleryItem.propTypes = {
  onLargeImgClick: PropTypes.func.isRequired,
  smallImageURL: PropTypes.string.isRequired,
};
