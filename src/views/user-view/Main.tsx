import React from 'react';
import styled from 'styled-components';
import Header from 'components/atoms/Header';
import BookingCalender from 'components/organisms/Calender';
import SideNav from 'components/organisms/SideNav';
import { fadeIn } from 'style/animation';
import { IMainState, IReduxState, TSelect } from 'models';
import { initialMainState, MODAL_TYPES } from 'utils';
import { cloneDeep } from 'lodash';
import { useSelector } from 'react-redux';
import Modal from 'components/organisms/Modal';
import ModalMessage from 'components/molecules/modals/ModalMessage';
import ModalReservation from 'components/molecules/modals/ModalReservation';

const MainWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s linear;
`;

export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => {
  const [mainState, setNavState] = React.useState<IMainState>(cloneDeep(initialMainState));

  const mainStateHandler = (value: TSelect, field: string) => {
    setNavState((prev) => ({ ...prev, [field]: value }));
  };

  const { isOpen, type } = useSelector((state: IReduxState) => state.modal);

  return (
    <MainWrapper>
      <Header>HARMONOGRAM REZERWACJI OBIEKTÓW</Header>
      <SideNav state={mainState} stateHandler={mainStateHandler} />
      <BookingCalender />
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.MESSAGE && <ModalMessage />}
          {type === MODAL_TYPES.RESERVATION && <ModalReservation mainState={mainState} />}
        </Modal>
      )}
    </MainWrapper>
  );
};

export default Main;
