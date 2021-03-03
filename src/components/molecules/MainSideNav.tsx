import * as React from 'react';
import styled from 'styled-components';

const SideWrapper = styled.nav`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

export interface IProps {}

const MainSideNav: React.SFC<IProps> = (): JSX.Element => (
  <SideWrapper>
    <h1>navbar</h1>
  </SideWrapper>
);

export default MainSideNav;
