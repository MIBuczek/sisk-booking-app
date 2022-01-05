import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/atoms/Header';
import { fadeIn } from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import Modal from 'components/organisms/Modal';
import { IAdminState, IReduxState, TSelect } from 'models';
import { ADMIN_TABS, BUILDINGS_OPTIONS, initialAdminState, MODAL_TYPES } from 'utils';
import ModalClient from 'components/molecules/modals/ModalClient';
import ModalAdminReservation from 'components/molecules/modals/ModalAdminReservation';
import ModalSummary from 'components/molecules/modals/ModalSummary';
import Clients from 'components/organisms/Clients';
import ModalMessage from 'components/molecules/modals/ModalMessage';

const AdminWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s linear;
  padding-bottom: 60px;
`;

const Admin = (): JSX.Element => {
  const [adminState, setAdminState] = React.useState<IAdminState>({ ...initialAdminState });
  const [tab, setTab] = React.useState<ADMIN_TABS>(ADMIN_TABS.CALENDER);

  const {
    authStore: { auth },
    modal: { isOpen, type }
  } = useSelector((state: IReduxState) => state);

  const stateHandler = (value: TSelect, field: string) => {
    if (field === 'city') {
      setAdminState(() => ({ city: value, building: BUILDINGS_OPTIONS[value.value][0] }));
    } else {
      setAdminState((prev) => ({ ...prev, building: value }));
    }
  };

  const tabHandler = (currentTab: ADMIN_TABS): void => {
    setTab(currentTab);
  };
  // if (!auth) {
  //   return <Redirect to="/login" />;
  // }

  React.useEffect(() => undefined, [tab]);

  return (
    <AdminWrapper>
      <Header>Panel Administratora</Header>
      <SideNav admin state={adminState} stateHandler={stateHandler} tabHandler={tabHandler} />
      {/* admin inner content */}
      {tab === ADMIN_TABS.CALENDER && <BookingCalender mainState={adminState} isAdmin />}
      {tab === ADMIN_TABS.CLIENTS && <Clients mainState={adminState} />}
      {/* modal content */}
      {isOpen && type === MODAL_TYPES.MESSAGE && (
        <Modal>
          <ModalMessage />
          {/* {type === MODAL_TYPES.BUILDINGS && <ModalBuilding adminState={adminState} />}
          {type === MODAL_TYPES.SUMMARY && <ModalSummary />}
          {type === MODAL_TYPES.ADMIN_RESERVATION && (
            <ModalAdminReservation adminState={adminState} />
          )} */}
        </Modal>
      )}
    </AdminWrapper>
  );
};

export default Admin;
