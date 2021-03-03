import * as React from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.section`
  width: 100%;
  height: 100%;
`;
export interface IProps {}

const Login: React.SFC<IProps> = (): JSX.Element => (
  <LoginWrapper>
    <h1>Hello from Login</h1>
  </LoginWrapper>
);

export default Login;
