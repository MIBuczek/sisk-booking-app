import * as React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const LogoWrapper = styled.div`
  width: 200px;
  height: auto;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export interface IProps {}

const SellectInput: React.SFC<IProps> = (): JSX.Element => (
  <LogoWrapper>
    <Logo />
  </LogoWrapper>
);

export default SellectInput;
