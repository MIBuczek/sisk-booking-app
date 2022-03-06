import styled from 'styled-components';

export interface HeaderProps {
  text: string;
}

const Header = styled.h1`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.middle};
  text-transform: uppercase;
  position: relative;
  line-height: 1.5;
  letter-spacing: -0.5px;
  margin: 40px 0;
  width: 80%;
  &:after {
    position: absolute;
    bottom: -14px;
    left: 0;
    content: '';
    border-bottom: 5px solid #afbf36;
    width: 110px;
  }
  svg {
    color: #afbf36;
    margin-left: 2rem;
  }
  @media (max-width: 1400px) {
    width: 85%;
  }
`;

export default Header;
