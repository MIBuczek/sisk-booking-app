import React from 'react';
import styled from 'styled-components';
import SideNav from '../../components/molecules/SideNav';

const MainWrapper = styled.section`
  width: 100%;
  max-width: 1470px;
  height: 82vh;
`;
export interface IProps {}

const Main: React.FC<IProps> = (): JSX.Element => (
  <MainWrapper>
    <SideNav />
  </MainWrapper>
);

export default Main;
