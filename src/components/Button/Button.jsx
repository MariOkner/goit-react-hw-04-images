import PropTypes from 'prop-types';
import { ButtonHTML } from './Button.styled';

export const Button = ({ handleClick }) => {
  return (
    <ButtonHTML type="button" onClick={handleClick}>
      Load more
    </ButtonHTML>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
