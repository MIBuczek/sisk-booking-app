import * as React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';

const LogoWrapper = styled.div`
  width: 258px;
  height: 70px;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 80%;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export interface IProps {}

const Logo: React.SFC<IProps> = (): JSX.Element => (
  <LogoWrapper>
    <LogoImg />
  </LogoWrapper>
);

export default Logo;
