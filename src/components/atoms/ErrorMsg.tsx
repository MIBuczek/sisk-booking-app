import styled from 'styled-components';

const ErrorMsg = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  position: relative;
  top: 3px;
  svg {
    height: 15px;
    width: 12px;
    margin-left: 3px;
  }
`;

export default ErrorMsg;
