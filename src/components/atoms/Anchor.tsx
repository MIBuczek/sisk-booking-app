import styled from 'styled-components';

type AnchorProps = {
  small?: boolean;
};

const Anchor = styled.a<AnchorProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ small }) => (small ? '1rem' : '1.5rem')};
  line-height: ${({ small }) => (small ? '1.1rem' : '1.5rem')};
  padding-top: ${({ small }) => (small ? '0' : '15px')};
  text-align: justify;
  font-family: 'Roboto', sans-serif;
  transition: 0.3s;
  text-decoration: none;
  letter-spacing: -0.5px;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

export const iconNormal = {
  fontSize: '2rem',
  marginRight: '1rem',
  color: 'AFBF36'
};

export default Anchor;
