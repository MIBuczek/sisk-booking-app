import * as React from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {EventClickArg, EventInput} from '@fullcalendar/core';
import {useDispatch, useSelector} from 'react-redux';
import Paragraph from 'components/atoms/Paragraph';
import {BsFillExclamationCircleFill} from 'react-icons/bs';
import {IAdminState, IBooking, IMainState, IReduxState} from 'models';
import ErrorMsgServer from 'components/atoms/ErrorMsgServer';
import {BOOKING_STATUS, MODAL_TYPES, prepareCalenderItem} from 'utils';
import {getCurrentBooking, openModal} from 'store';
import RenderEventContent from 'components/atoms/CalenderEvent';
import ModalResolveBooking from 'components/molecules/modals/ModalResolveBooking';
import Modal from 'components/organisms/Modal';
import ModalInfo from 'components/molecules/modals/ModalInfo';
import {isEqual} from 'lodash';
import {LoaderDots} from '../molecules/Loading';

const CalenderWrapper = styled.section`
   width: 60%;
   min-height: 400px;
   height: auto;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 30px 0;
   z-index: 0;

   .fc-list-table {
      .fc-event {
         cursor: pointer;
      }
   }

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
         background-color: ${({theme}) => theme.green};
         border-color: #b9b8b8;
         overflow: hidden;
         cursor: pointer;

         p {
            margin: 3px 2px;
         }
      }

      .fc-button-primary {
         background-color: #eaeaea;
         border-color: ${({theme}) => theme.green};
         color: #454545;
         transition: 0.4s;

         &:focus,
         &:hover {
            background-color: ${({theme}) => theme.green};
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

const LoadingWrapper = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 100;
`;

interface IProps {
   mainState?: IMainState | IAdminState;
   hasRights?: boolean;
}

/**
 * Booking calendar component.
 * Contains full calendar to display events and dispatch click actions.
 *
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const BookingCalender: React.FunctionComponent<IProps> = ({mainState, hasRights}): JSX.Element => {
   const [events, setEvents] = React.useState<EventInput[]>([]);
   const [loading, setLoading] = React.useState(true);

   const dispatch = useDispatch();
   const {
      modal: {isOpen, type},
      bookingStore: {bookings, errorMessage}
   } = useSelector((state: IReduxState) => state);

   /**
    * Function create event into full calendar component.
    * Event is related to the user or admin view.
    */
   const createEvents = (): void => {
      if (!mainState) return;
      const calenderEvents = bookings.reduce(
         (acc: EventInput[], booking: IBooking): EventInput[] => {
            const {city, building} = mainState;
            if (city.value === booking.city && building.value === booking.building) {
               booking.bookingTime.forEach((bt, index) => {
                  const itemTitle = `${hasRights ? booking.person : 'Rezerwacja'}`;
                  if (bt.status !== BOOKING_STATUS.QUIT) {
                     acc.push(prepareCalenderItem(itemTitle, booking, index));
                  }
               });
            }
            return acc;
         },
         []
      );
      if (!isEqual(calenderEvents, events)) setEvents(calenderEvents);
   };

   /**
    * Full calendar event to get data and get current booking data from the store.
    *
    * @param arg
    */
   const handleEventClick = (arg: EventClickArg): void => {
      arg.jsEvent.preventDefault();
      arg.jsEvent.stopPropagation();

      dispatch(getCurrentBooking(arg.event._def.publicId, arg.event.extendedProps.itemIndex));

      if (hasRights) {
         dispatch(openModal(MODAL_TYPES.BOOKINGS_CALENDER_STATUS));
      }
   };

   /**
    * Refresh view component after any mainState or bookings changes.
    */
   React.useEffect(() => createEvents(), [mainState, bookings]);

   /**
    * Block initial view go get final events objects.
    */
   React.useEffect(() => {
      setTimeout(() => setLoading(false), 1500);
   }, []);

   return (
      <CalenderWrapper>
         {errorMessage && <ErrorMsgServer innerText={errorMessage} />}
         {loading ? (
            <LoadingWrapper>
               <LoaderDots type="ball-pulse" active />
            </LoadingWrapper>
         ) : (
            <>
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
                     <BsFillExclamationCircleFill />W kalendarzu są widoczne tylko zatwierdzone
                     przez administratora rezerwacje.
                  </UserInfo>
               )}
            </>
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
