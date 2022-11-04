import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { OverlayHTML, ContentHTML } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <OverlayHTML onClick={handleBackdropClick}>
      <ContentHTML>{children}</ContentHTML>
    </OverlayHTML>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// static propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

// state = {};

// componentDidMount() {
//   window.addEventListener('keydown', this.handleKeyDown);
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.handleKeyDown);
// }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <OverlayHTML onClick={this.handleBackdropClick}>
//         <ContentHTML>{this.props.children}</ContentHTML>
//       </OverlayHTML>,
//       modalRoot
//     );
//   }
// }
