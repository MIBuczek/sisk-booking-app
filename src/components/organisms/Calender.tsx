import * as React from 'react';
import styled from 'styled-components';
import FullCalendar, { EventClickArg, EventInput } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import Paragraph from 'components/atoms/Paragraph';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { IAdminState, IBooking, IMainState } from 'models';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import { BOOKING_STATUS, MODAL_TYPES, prepareCalenderItem } from '../../utils';
import RenderEventContent from '../atoms/CalenderEvent';
import { IReduxState } from '../../models';
import { getCurrentBooking, openModal } from '../../store';
import ModalResolveBooking from '../molecules/modals/ModalResolveBooking';
import Modal from './Modal';
import ModalInfo from '../molecules/modals/ModalInfo';

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
    max-height: 650px;
    font-size: 12px;
    font-weight: 500;
    color: #454545;

    .fc-day-today {
      .fc-timegrid-col-frame {
        background: #eeeeee;
      }
    }

    .fc-timegrid-event.fc-v-event {
      background-color: ${({ theme }) => theme.green};
      border-color: #b9b8b8;
      overflow: hidden;

      p {
        margin: 3px 2px;
      }
    }

    .fc-button-primary {
      background-color: #eaeaea;
      border-color: ${({ theme }) => theme.green};
      color: #454545;
      transition: 0.4s;

      &:focus,
      &:hover {
        background-color: ${({ theme }) => theme.green};
        border-color: #b9b8b8;
        box-shadow: none;
      }

      &:not(:disabled):active {
        background-color: #454545;
        color: #b9b8b8;
      }

      &:disabled {
        background-color: #b9b8b8;
        border-color: #454545;
        color: #454545;

        &:hover {
          background-color: #b9b8b8;
          border-color: #454545;
        }
      }
    }

    .fc-button-primary.fc-next-button,
    .fc-button-primary.fc-prev-button {
      color: white;
    }

    .fc-button-primary.fc-timeGridWeek-button.fc-button-active,
    .fc-button-primary.fc-listWeek-button.fc-button-active {
      background-color: #454545;
      color: #b9b8b8;

      &:focus {
        box-shadow: none;
      }
    }

    .fc-list-day-cushion {
      color: #454545;
    }

    .fc-button-group {
      .fc-button {
        background: #afbf36;
        border-color: #eaeaea;
      }

      .fc-button-active {
        background-color: #eaeaea;
        border-color: #afbf36;
      }
    }

    @media (max-width: 1400px) {
      height: 950px;
    }
  }

  @media (max-width: 1400px) {
    width: 95%;
    padding: 30px 20px;
  }
`;

const UserInfo = styled(Paragraph)`
  font-size: 12px;
  width: 95%;

  svg {
    margin-right: 10px;
    color: #afbf36;
  }
`;

interface IProps {
  mainState?: IMainState | IAdminState;
  hasRights?: boolean;
}

const BookingCalender: React.FunctionComponent<IProps> = ({
  mainState,
  hasRights
}): JSX.Element => {
  const [events, setEvents] = React.useState<EventInput[]>([]);

  const dispatch = useDispatch();
  const {
    modal: { isOpen, type },
    bookingStore: { bookings, errorMessage }
  } = useSelector((state: IReduxState) => state);

  /**
   * Function create event into full calendar component.
   * Event is related to the user or admin view.
   */
  const createEvents = (): void =>
    setEvents(
      bookings.reduce((acc: EventInput[], booking: IBooking) => {
        if (
          mainState &&
          mainState.city.value === booking.city &&
          mainState.building.value === booking.building
        ) {
          booking.bookingTime.forEach((bt, index) => {
            const itemTitle = `${hasRights ? booking.person : 'Rezerwacja'}`;
            if (bt.status !== BOOKING_STATUS.QUIT) {
              acc.push(prepareCalenderItem(itemTitle, booking, index));
            }
          });
        }
        return acc;
      }, [])
    );

  /**
   * Full calendar event to get data and get current booking data from the store.
   * @param clickInfo
   */
  const handleEventClick = async (clickInfo: EventClickArg) => {
    clickInfo.jsEvent.preventDefault();
    dispatch(
      getCurrentBooking(clickInfo.event._def.publicId, clickInfo.event.extendedProps.itemIndex)
    );

    if (hasRights) {
      dispatch(openModal(MODAL_TYPES.BOOKINGS_CALENDER_STATUS));
    }
  };

  React.useEffect(() => {
    createEvents();
  }, [mainState, bookings]);

  return (
    <CalenderWrapper>
      {errorMessage && <ErrorMsgServer innerText={errorMessage} />}
      <FullCalendar
        plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          right: 'timeGridWeek,listWeek'
        }}
        locale="pl"
        initialView="timeGridWeek"
        selectMirror
        dayMaxEvents
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        allDaySlot={false}
        firstDay={1}
        weekends
        events={events}
        eventContent={RenderEventContent}
        eventClick={handleEventClick}
        timeZone="local"
      />
      {!hasRights && (
        <UserInfo>
          <BsFillExclamationCircleFill />W kalendarzu są widoczne tylko zatwierdzone przez
          administratora rezerwacje.
        </UserInfo>
      )}
      {isOpen && (
        <Modal>
          {type === MODAL_TYPES.BOOKINGS_CALENDER_STATUS && <ModalResolveBooking />}
          {type === MODAL_TYPES.SUCCESS && <ModalInfo header="Rezerwacja" />}
          {type === MODAL_TYPES.ERROR && <ModalInfo header="Rezerwacja" />}
        </Modal>
      )}
    </CalenderWrapper>
  );
};
export default BookingCalender;
