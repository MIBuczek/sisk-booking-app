import * as React from 'react';
import styled from 'styled-components';
import logo from 'assets/images/logo-white.png';

const LogoWrapper = styled.div`
   width: 228px;
   height: 70px;
   display: flex;
   align-items: center;
`;

const LogoImg = styled.img`
   width: 100%;
   height: auto;
`;

const Logo: React.FC = (): JSX.Element => (
   <LogoWrapper>
      <LogoImg src={logo} />
   </LogoWrapper>
);

export default Logo;
