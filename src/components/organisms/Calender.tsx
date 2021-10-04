import * as React from 'react';
import styled from 'styled-components';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { prepareCalenderItem } from '../../utils/functions/calender-functions';
import RenderEventContent from '../atoms/CalenderEvent';
import { IReduxState } from '../../models/store/store-models';
import { getCurrentBooking } from '../../store/bookings/bookingsAction';

const CalenderWrapper = styled.section`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  z-index: 0;
  .fc-direction-ltr {
    width: 95%;
  }
`;

export interface IProps {}

const BookingCalender: React.FC<IProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state: IReduxState) => state.bookingState);

  const createEvents = (): EventInput[] => bookings.map(prepareCalenderItem);

  const handleEventClick = async (clickInfo: EventClickArg) => {
    dispatch(getCurrentBooking(clickInfo.event._def.publicId));
  };

  return (
    <CalenderWrapper>
      <FullCalendar
        plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          right: 'timeGridWeek,listWeek',
        }}
        locale="pl"
        initialView="timeGridWeek"
        editable
        selectMirror
        dayMaxEvents
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        weekends
        events={createEvents()}
        eventContent={RenderEventContent}
        eventClick={handleEventClick}
      />
    </CalenderWrapper>
  );
};
export default BookingCalender;
