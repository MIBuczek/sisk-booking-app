import * as React from 'react';
import { EventContentArg } from '@fullcalendar/react';

const RenderEventContent = (eventContent: EventContentArg) => (
  <>
    <b>{eventContent.event.title}</b>
  </>
);

export default RenderEventContent;
