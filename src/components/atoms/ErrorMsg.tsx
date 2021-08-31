import styled from 'styled-components';

const ErrorMsg = styled.span`
  font-size: 10px;
  color: red;
  font-weight: 600;
  display: flex;
  align-items: center;
  svg {
    height: 15px;
    width: 12px;
    margin-left: 3px;
  }
`;

export default ErrorMsg;