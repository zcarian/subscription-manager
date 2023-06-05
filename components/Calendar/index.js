import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useRouter } from 'next/router';
import { renderEventContent, transformData } from '../../utils/calendarUtils';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  padding:3vh;
`

export default function CalendarComponent({ apps }) {
  const {push} = useRouter();

  const events = transformData(apps);

  console.log(events);

  function handleEventClick(info) {
    push(`/subscribed-apps/${info.event.id}`);
  }

  const handleEventMouseEnter = (info) => {
    info.el.title = `${info.event._def.title} - ${info.event.extendedProps.price} ${info.event.extendedProps.currency}`

  }

  return (
    <CalendarContainer>

      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        height={'auto'}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
      />
    </CalendarContainer>
  )
}
