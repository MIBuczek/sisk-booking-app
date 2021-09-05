import styled from 'styled-components';

type IconeTypes = {
  small?: boolean;
};

const Icone = styled.svg<IconeTypes>`
  margin-right: 1rem;
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ small }) => (small ? '1rem' : '1.5rem')};
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

export default Icone;
