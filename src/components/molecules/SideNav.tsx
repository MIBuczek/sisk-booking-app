import * as React from 'react';
import styled from 'styled-components';
import SelectInputField from '../atoms/SelectInputField';

const SideWrapper = styled.nav`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
`;

export interface IProps {}

const SideNav: React.SFC<IProps> = (): JSX.Element => (
  <SideWrapper>
    <h1>navbar</h1>
    <SelectInputField />
  </SideWrapper>
);

export default SideNav;
