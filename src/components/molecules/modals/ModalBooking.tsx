import * as React from 'react';
import {IMainState} from 'models';
import BookingForm from 'components/molecules/forms/booking/BookingForm';

interface IProps {
   mainState: IMainState;
}

/**
 * Booking modal component - display booking form.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ModalBooking: React.FunctionComponent<IProps> = ({mainState}): JSX.Element => (
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
