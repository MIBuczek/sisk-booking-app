import React, { useContext } from 'react';
import styled from 'styled-components';
import SideNav from '../../components/molecules/SideNav';
import Modal from '../../components/organisms/Modal';
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
          <span>modal</span>
        </Modal>
      )}
    </MainWrapper>
  );
};

export default Main;
