import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import bgModal from '../../assets/images/background-modal.jpg';
import { IReduxState } from '../../models';
import { fadeIn } from '../../style/animation';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: fix-content;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s linear;
  z-index: 9999;
`;

const BGImage = styled.img`
  width: 100%;
  height: 100vh;
  opacity: 0.5;
`;

const ModalContent = styled.div`
  min-width: 400px;
  min-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 95vh;
  border: 2px solid #afbf36;
  border-radius: 5px;
  background: white;
  position: absolute;
  @media (max-width: 890px) {
    min-width: 95%;
  }
`;

export interface IProps {
  children: JSX.Element | boolean | (JSX.Element | boolean)[];
}

const Modal: React.FC<IProps> = ({ children }): JSX.Element | null => {
  const { isOpen } = useSelector((state: IReduxState) => state.modal);
  if (isOpen) {
    return (
      <ModalWrapper>
        <BGImage src={bgModal} alt="bg" />
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    );
  }
  return null;
};

export default Modal;
