import * as React from 'react';
import styled from 'styled-components';
import bgModal from '../../assets/images/background-modal.jpg';
import { ModalContext, initialModal } from '../../context/ModalContext';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BGImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const ModalContent = styled.div`
  min-width: 400px;
  min-height: 200px;
  border: 2px solid #afbf36;
  background: white;
  position: fixed;
`;

export interface IProps {
  children: JSX.Element;
}

const Modal: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const {
    modal: { isOpen },
    setModal,
  } = React.useContext(ModalContext);

  if (isOpen) {
    return (
      <ModalWrapper role="button" onClick={() => setModal({ ...initialModal })}>
        <BGImage src={bgModal} alt="bg" />
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    );
  }
  return null;
};

export default Modal;
