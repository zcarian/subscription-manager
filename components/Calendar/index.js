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

  const handleEventMouseEnter = (info) => {
    // For simplicity, we'll use the browser's built-in tooltip (title attribute
    info.el.title = `${info.event._def.title} - ${info.event.extendedProps.price} ${info.event.extendedProps.currency}`

  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
      height={'auto'}
      eventClick={handleEventClick}
      eventMouseEnter={handleEventMouseEnter}
    />
  )
}
