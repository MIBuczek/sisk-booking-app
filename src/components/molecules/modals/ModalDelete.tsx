import * as React from 'react';
import styled from 'styled-components';
import ConfirmAction from 'components/molecules/ConfirmAction';

const DeleteWrapper = styled.div`
   display: flex;
   flex-direction: column;
   min-width: 500px;
   button {
      align-self: flex-end;
   }
`;

interface ModalDeleteProps {
   message: string;
   callback: () => void;
   cancelCallback: () => void;
}

const ModalDelete: React.FunctionComponent<ModalDeleteProps> = ({
   message,
   callback,
   cancelCallback
}) => (
   <DeleteWrapper>
      <ConfirmAction message={message} callback={callback} cancelCallback={cancelCallback} />
   </DeleteWrapper>
);

export default ModalDelete;
