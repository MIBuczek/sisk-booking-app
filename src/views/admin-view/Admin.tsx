import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildingsData } from 'store/building/buildingActions';
import Header from 'components/atoms/Header';
import { fadeIn } from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import Modal from 'components/organisms/Modal';
import { IAdminState, IReduxState, TSelect } from 'models';
import { initialAdminState, MODAL_TYPES } from 'utils';
import ModalClient from 'components/molecules/modals/ModalClient';
import ModalBuilding from 'components/molecules/modals/ModalBuilding';
import ModalAdminReservation from 'components/molecules/modals/ModalAdminReservation';
import ModalSummary from 'components/molecules/modals/ModalSummary';

const AdminWrapper = styled.section`
  width: 100%;
  min-height: 82vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.5s linear;
`;
const Admin = (): JSX.Element => {
  const [adminState, setAdminState] = React.useState<IAdminState>({ ...initialAdminState });

  const dispatch = useDispatch();

  const {
    authStore: { auth },
    modal: { isOpen, type }
  } = useSelector((state: IReduxState) => state);

  const stateHandler = (value: TSelect, field: string) => {
    setAdminState((prev) => ({ ...prev, [field]: value }));
  };

  // React.useEffect(() => {
  //   dispatch(getBuildingsData());
  // }, []);

  if (!auth) {
    return <Redirect to="/" />;
  }
  return (
    <AdminWrapper>
      <Header>Panel Administratora</Header>
      <SideNav admin state={adminState} stateHandler={stateHandler} />
      <BookingCalender />
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.CLIENT && <ModalClient />}
          {type === MODAL_TYPES.BUILDINGS && <ModalBuilding adminState={adminState} />}
          {type === MODAL_TYPES.SUMMARY && <ModalSummary />}
          {type === MODAL_TYPES.ADMIN_RESERVATION && <ModalAdminReservation />}
        </Modal>
      )}
    </AdminWrapper>
  );
};

export default Admin;
