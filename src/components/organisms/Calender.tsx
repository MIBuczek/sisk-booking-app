/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import * as React from 'react';
import styled from 'styled-components';
import FullCalendar, { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId, INITIAL_EVENTS } from '../../utils/calender-functions';
import RenderEventContent from '../atoms/CalenderContentEvent';

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
  const [state, setState] = React.useState({
    weekendsVisible: true,
    currentEvents: [],
  });

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
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setState((prev: any) => ({
      ...prev,
      currentEvents: [...state.currentEvents, events],
    }));
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
        selectable
        selectMirror
        dayMaxEvents
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        weekends={state.weekendsVisible}
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventContent={RenderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
      />
    </CalenderWrapper>
  );
};
export default BookingCalender;
