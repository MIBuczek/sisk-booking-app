import * as React from "react";
import styled from "styled-components";

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 80px;
`;
export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => <NavbarWrapper />;

export default Navigation;
