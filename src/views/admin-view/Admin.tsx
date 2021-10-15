import * as React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildingsData } from 'store/building/buildingActions';
import Header from 'components/atoms/Header';
import { fadeIn } from 'style/animation';
import SideNav from 'components/organisms/SideNav';
import BookingCalender from 'components/organisms/Calender';
import { IAdminState, IReduxState, TSelect } from 'models';
import { initialAdminState } from 'utils';

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
  const { auth } = useSelector((state: IReduxState) => state.auth);

  const stateHandler = (value: TSelect, field: string) => {
    setAdminState((prev) => ({ ...prev, [field]: value }));
  };

  console.log(auth);
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
    </AdminWrapper>
  );
};

export default Admin;
