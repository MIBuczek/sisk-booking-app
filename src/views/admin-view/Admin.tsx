import * as React from 'react';
import styled from 'styled-components';

const AdminWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
export interface IProps {}

const Admin: React.SFC<IProps> = (): JSX.Element => (
  <AdminWrapper>
    <h1>Hello from Admin</h1>
  </AdminWrapper>
);

export default Admin;
