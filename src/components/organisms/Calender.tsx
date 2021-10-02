/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styled from 'styled-components';
import FullCalendar, { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import { createEventId, formatDate, INITIAL_EVENTS } from '../../utils/calender-functions';
import RenderEventContent from '../atoms/CalenderEvent';
import { IReduxState } from '../../models/store/store-models';

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
  const { bookings } = useSelector((state: IReduxState) => state.bookingState);

  React.useEffect(() => {}, [bookings]);

  const createEvents = (): EventInput[] =>
    bookings.map((b) => ({
      allDay: false,
      id: createEventId(),
      title: 'Rezerwacja',
      start: `${formatDate(b.when as Date)}T12:00:00+02:00`,
      end: `${formatDate(b.when as Date)}T14:00:00+02:00`,
    }));

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log(clickInfo.event._def.publicId);
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  };

  // const handleEvents = (events: EventApi[]) => {
  //   setCalender((prev: any) => ({
  //     ...prev,
  //     currentEvents: [...calender.currentEvents, events],
  //   }));
  // };

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
        selectable
        selectMirror
        dayMaxEvents
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        weekends
        initialEvents={INITIAL_EVENTS}
        events={createEvents()}
        select={handleDateSelect}
        eventContent={RenderEventContent}
        eventClick={handleEventClick}
        // eventsSet={handleEvents}
      />
    </CalenderWrapper>
  );
};
export default BookingCalender;
