import * as React from 'react';
import { EventContentArg } from '@fullcalendar/react';

const RenderEventContent = (eventContent: EventContentArg) => (
  <>
    <p>{eventContent.event.title}</p>
    <p>{eventContent.event.url}</p>
    <p>{eventContent.event.textColor}</p>
  </>
);
export default RenderEventContent;
