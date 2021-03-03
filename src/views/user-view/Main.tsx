import * as React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
export interface IProps {}

const Main: React.SFC<IProps> = (): JSX.Element => <MainWrapper />;

export default Main;
