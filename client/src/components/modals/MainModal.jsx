import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MainModal = ({
  onClose,
  children,
  footerContent,
  isOpen,
  size,
  title,
  modalMainBg = 'white',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      {/* Blurred Background Effect */}
      <ModalOverlay bg='rgba(0, 0, 0, 0.5)' backdropFilter='blur(10px)' />
      <ModalContent
        bg={modalMainBg}
        rounded='1rem'
        shadow='dark-lg'
        mx='auto'
        textAlign='center'
      >
        <ModalCloseButton />
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

MainModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  footerContent: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  modalMainBg: PropTypes.string,
};

export default MainModal;
