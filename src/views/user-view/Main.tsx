import React, { useContext } from 'react';
import styled from 'styled-components';
import SideNav from '../../components/molecules/SideNav';
import Modal from '../../components/organisms/Modal';
import ModalMessage from '../../components/molecules/ModalMessage';
import { ModalContext } from '../../context/ModalContext';

const MainWrapper = styled.section`
  width: 100%;
  height: 82vh;
`;
export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => {
  const {
    modal: { isOpen },
  } = useContext(ModalContext);

  return (
    <MainWrapper>
      <SideNav />
      {isOpen && (
        <Modal>
          <ModalMessage />
        </Modal>
      )}
    </MainWrapper>
  );
};

export default Main;
