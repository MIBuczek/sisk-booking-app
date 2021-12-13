import * as React from 'react';
import { IMainState } from 'models/components/main-view-model';
import NewReservationForm from '../forms/NewReservationForm';

interface IProps {
  mainState: IMainState;
}

const ModalReservation: React.FunctionComponent<IProps> = ({ mainState }) => (
  <NewReservationForm
    mainState={mainState}
    isAdmin={false}
    isEditing={false}
    initialEditingState={() => null}
  />
);

export default ModalReservation;
