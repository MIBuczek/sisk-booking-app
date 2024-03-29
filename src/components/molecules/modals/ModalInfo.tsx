import * as React from 'react';
import Header from 'components/atoms/Header';
import Paragraph from 'components/atoms/Paragraph';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {IReduxState} from 'models';
import Button from 'components/atoms/Button';
import {closeModal} from 'store';

const InfoWrapper = styled.div`
   padding: 0 20px 20px;
   display: flex;
   flex-direction: column;
   button {
      align-self: flex-end;
   }
`;

const MessageHeader = styled(Header)`
   width: 100%;
   margin: 20px 0 40px;
`;

const InfoParagraph = styled(Paragraph)`
   padding-bottom: 4rem;
`;

interface IProps {
   header: string;
}

/**
 * Modal information component.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ModalInfo: React.FunctionComponent<IProps> = ({header}): JSX.Element => {
   const dispatch = useDispatch();
   const {message} = useSelector((store: IReduxState) => store.modal);

   return (
      <InfoWrapper>
         <MessageHeader>{header}</MessageHeader>
         <InfoParagraph small>{message}</InfoParagraph>
         <Button role="button" onClick={() => dispatch(closeModal())}>
            Zamknij
         </Button>
      </InfoWrapper>
   );
};

export default ModalInfo;
