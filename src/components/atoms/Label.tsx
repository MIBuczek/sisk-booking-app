import styled from 'styled-components';

const Label = styled.span`
  color: ${({ theme }) => theme.darkGrey};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.bold};
  margin: 8px;
`;

export default Label;
