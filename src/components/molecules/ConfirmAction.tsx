import Button from 'components/atoms/Button';
import Paragraph from 'components/atoms/Paragraph';
import * as React from 'react';
import { fadeIn } from 'style/animation';
import styled from 'styled-components';

const ConfirmationWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #afbf36;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  animation: ${fadeIn} 0.5s linear;
`;

const ConfirmationContent = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmationParagraph = styled(Paragraph)`
  padding-bottom: 2rem;
  color: white;
  position: relative;
  font-size: 16px;
  &:after {
    position: absolute;
    bottom: -14px;
    left: 0;
    content: '';
    border-bottom: 5px solid white;
    width: 110px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ConfirmationBtn = styled(Button)`
  padding: 10px 20px;
`;

interface IProps {
  message: string;
  callback: () => void;
  cancelCallback: () => void;
}

const ConfirmAction: React.FunctionComponent<IProps> = ({ message, callback, cancelCallback }) => (
  <ConfirmationWrapper>
    <ConfirmationContent>
      <ConfirmationParagraph>{message}</ConfirmationParagraph>
      <ButtonWrapper>
        <ConfirmationBtn role="button" secondary onClick={cancelCallback}>
          Nie
        </ConfirmationBtn>
        <ConfirmationBtn role="button" secondary onClick={callback}>
          Tak
        </ConfirmationBtn>
      </ButtonWrapper>
    </ConfirmationContent>
  </ConfirmationWrapper>
);

export default ConfirmAction;
