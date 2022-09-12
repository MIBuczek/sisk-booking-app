import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Button from '../../atoms/Button';
import { closeModal } from '../../../store';
import { IBooking } from '../../../models';

const ModalConflictWrapper = styled.div`
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-end;
  }
`;

const ClientStatusDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 80%;
  border-top: ${({ theme }) => `1px solid ${theme.green}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.green}`};
`;

const DetailsSpan = styled.span`
  font-weight: 400;
  margin: 8px 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.darkGrey};
`;

interface IProps {
  conflictBookings: IBooking[];
}

const ModalConflictDetails: React.FunctionComponent<IProps> = ({
  conflictBookings
}): JSX.Element => {
  const dispatch = useDispatch();

  const closeConflictModal = (): void => {
    dispatch(closeModal());
  };

  return (
    <ModalConflictWrapper>
      {conflictBookings.map(({ person, bookingTime }) => (
          <ClientStatusDetails key={`${new Date().getTime()}`}>
            <DetailsSpan>
              <strong>Klient: </strong>
              {person}
            </DetailsSpan>
          </ClientStatusDetails>
      ))}
      <Button type="button" onClick={closeConflictModal} secondary>
        Zamknij
      </Button>
    </ModalConflictWrapper>
  );
};

export default ModalConflictDetails;
