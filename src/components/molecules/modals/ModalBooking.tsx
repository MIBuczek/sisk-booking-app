import * as React from 'react';
import { IMainState } from 'models/components/main-view-model';
import NewBookingForm from '../forms/NewBookingForm';

interface IProps {
  mainState: IMainState;
}

const ModalBooking: React.FunctionComponent<IProps> = ({ mainState }) => (
  <NewBookingForm
    mainState={mainState}
    isAdmin={false}
    isEditing={false}
    initialEditingState={() => null}
  />
);

export default ModalBooking;
