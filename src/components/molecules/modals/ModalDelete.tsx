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

interface IProps {
   message: string;
   callback: () => void;
   cancelCallback: () => void;
}

/**
 * Modal delete record confirmation content on database.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ModalDelete: React.FunctionComponent<IProps> = ({
   message,
   callback,
   cancelCallback
}): JSX.Element => (
   <DeleteWrapper>
      <ConfirmAction message={message} callback={callback} cancelCallback={cancelCallback} />
   </DeleteWrapper>
);

export default ModalDelete;
