import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getBuildingsData } from '../../store/building/buildingActions';

const AdminWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
export interface IProps {}

const Admin: React.SFC<IProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBuildingsData());
  }, []);

  return (
    <AdminWrapper>
      <h1>Hello from Admin</h1>
    </AdminWrapper>
  );
};

export default Admin;
