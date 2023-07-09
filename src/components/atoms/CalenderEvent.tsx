import * as React from 'react';
import {EventContentArg} from '@fullcalendar/common';
import styled from 'styled-components';

const EventWrapper = styled.div`
   width: 100%;
   height: 100%;
   display: inherit;
   justify-content: inherit;
   align-items: inherit;
`;

/**
 * Full calender event input element.
 *
 * @param {EventContentArg} eventContent
 * @returns {JSX.Element}
 */
const RenderEventContent = (eventContent: EventContentArg): JSX.Element => (
   <EventWrapper style={{background: `${eventContent.event.backgroundColor}`}}>
      <p>{eventContent.event.title}</p>
      <p>{eventContent.event.extendedProps.bookedTime}</p>
      <p>{eventContent.event.extendedProps.bookedSize}</p>
   </EventWrapper>
);

export default RenderEventContent;
