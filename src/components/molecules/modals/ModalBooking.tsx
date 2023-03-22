import * as React from 'react';
import { IMainState } from 'models/components/main-view-model';
import BookingForm from '../forms/BookingForm';

interface IProps {
  mainState: IMainState;
}

const ModalBooking: React.FunctionComponent<IProps> = ({ mainState }) => (
   <BookingForm
      mainState={mainState}
      bookingsList={[]}
      isSISKEmployee={false}
      isAdmin={false}
      isEditing={false}
      initialEditingState={() => null}
   />
);

export default ModalBooking;
