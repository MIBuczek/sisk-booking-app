import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Header from 'components/atoms/Header';
import { fadeIn } from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import Modal from 'components/organisms/Modal';
import { IAdminState, IReduxState, TSelect } from 'models';
import {
  adminCredentials,
  ADMIN_TABS,
  BUILDINGS_OPTIONS,
  initialAdminState,
  MODAL_TYPES
} from 'utils';
import Clients from 'components/organisms/Clients';
import ModalMessage from 'components/molecules/modals/ModalMessage';
import Bookings from 'components/organisms/Bookings';
import Building from 'components/organisms/Building';
import Summary from 'components/organisms/Summary';

const AdminWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 5vh;
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
    currentUserStore: { user },
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

  React.useEffect(() => undefined, [tab]);

  // if (!auth) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <AdminWrapper>
      <Header>Panel Administratora</Header>
      <SideNav
        isAdminPanel
        state={adminState}
        stateHandler={stateHandler}
        tabHandler={tabHandler}
        isAdmin={adminCredentials(user)}
      />
      {/* admin inner content */}
      {tab === ADMIN_TABS.CALENDER && <BookingCalender mainState={adminState} isAdmin />}
      {tab === ADMIN_TABS.BOOKINGS && <Bookings mainState={adminState} />}
      {adminCredentials(user) && (
        <>
          {tab === ADMIN_TABS.CLIENTS && <Clients />}
          {tab === ADMIN_TABS.BUILDINGS && <Building mainState={adminState} />}
          {tab === ADMIN_TABS.SUMMARY && <Summary />}
        </>
      )}
      {/* modal content */}
      {isOpen && type === MODAL_TYPES.MESSAGE && (
        <Modal>
          <ModalMessage />
        </Modal>
      )}
    </AdminWrapper>
  );
};

export default Admin;
