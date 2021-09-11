import * as React from 'react';
import { EventContentArg } from '@fullcalendar/react';

const RenderEventContent = (eventContent: EventContentArg) => (
  <>
    <b>{eventContent.timeText}</b>
    <i>{eventContent.event.title}</i>
  </>
);

export default RenderEventContent;
