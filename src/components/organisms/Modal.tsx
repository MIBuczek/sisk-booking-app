import * as React from 'react';
import { BsX } from 'react-icons/bs';
import styled from 'styled-components';
import bgModal from '../../assets/images/background-modal.jpg';
import { ModalContext } from '../../context/ModalContext';
import { fadeIn } from '../../style/animation';
import { INITIAL_MODAL } from '../../utils/variables/modal-const';
import ButtonIcon from '../atoms/ButtonIcon';

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s linear;
  z-index: 9999;
  button {
    margin: 0 0 0 auto;
  }
`;

const BGImage = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const ModalContent = styled.div`
  min-width: 400px;
  min-height: 200px;
  max-height: 100%;
  overflow-y: auto;
  border: 2px solid #afbf36;
  border-radius: 5px;
  background: white;
  position: fixed;
  top: 5px;
  bottom: 5px;
`;

export interface IProps {
  children: (JSX.Element | boolean)[];
}

const Modal: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const {
    modal: { isOpen },
    setModal,
  } = React.useContext(ModalContext);

  if (isOpen) {
    return (
      <ModalWrapper>
        <BGImage src={bgModal} alt="bg" />
        <ModalContent>
          <ButtonIcon role="button" onClick={() => setModal({ ...INITIAL_MODAL })}>
            <BsX />
          </ButtonIcon>
          {children}
        </ModalContent>
      </ModalWrapper>
    );
  }
  return null;
};

export default Modal;
