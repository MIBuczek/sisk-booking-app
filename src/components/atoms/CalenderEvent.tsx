import * as React from 'react';
import {EventContentArg} from '@fullcalendar/common';

const RenderEventContent = (eventContent: EventContentArg) => (
   <>
      <p>{eventContent.event.title}</p>
      <p>{eventContent.event.extendedProps.bookedTime}</p>
      <p>{eventContent.event.extendedProps.bookedSize}</p>
   </>
);
export default RenderEventContent;
