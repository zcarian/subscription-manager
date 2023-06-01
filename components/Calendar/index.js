import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useRouter } from 'next/router';
import { renderEventContent, transformData } from '../../utils/calendarUtils';

export default function CalendarComponent({ apps }) {
  const {push} = useRouter();

  const events = transformData(apps);

  function handleEventClick(info) {
    push(`/subscribed-apps/${info.event.id}`);
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
      height={'auto'}
      eventClick={handleEventClick}
    />
  )
}
