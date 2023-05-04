import * as React from 'react';
import {EventContentArg} from '@fullcalendar/common';

/**
 * Full calender event input element.
 *
 * @param {EventContentArg} eventContent
 * @returns {JSX.Element}
 */
const RenderEventContent = (eventContent: EventContentArg): JSX.Element => (
   <>
      <p>{eventContent.event.title}</p>
      <p>{eventContent.event.extendedProps.bookedTime}</p>
      <p>{eventContent.event.extendedProps.bookedSize}</p>
   </>
);

export default RenderEventContent;
