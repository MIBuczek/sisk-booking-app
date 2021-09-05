import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RedirectLink = styled(Link)`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.bold};
  border: 1px solid #454545;
  background: ${({ theme }) => theme.green};
  border-radius: 10px;
  font-family: inherit;
  margin: 1rem 0;
  cursor: pointer;
  padding: 10px;
`;

export default RedirectLink;
