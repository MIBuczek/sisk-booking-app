import * as React from 'react';
import styled from 'styled-components';
import SideNav from '../../components/molecules/SideNav';

const MainWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
export interface IProps {}

const Main: React.SFC<IProps> = (): JSX.Element => (
  <MainWrapper>
    <SideNav />
  </MainWrapper>
);

export default Main;
