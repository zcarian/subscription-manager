import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useRouter } from 'next/router';

const CalendarComponent = ({ apps }) => {
    const {push} = useRouter();

  const events = transformData(apps);

  function handleEventClick(info) {

    console.log('id',info);
    push(`/subscribed-apps/${info.event.id}`);
  }

  return (
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent} // custom render function
      height={'auto'}
      eventClick={handleEventClick}
    />
  )
}

// Custom event render function
function renderEventContent(eventInfo) {
    return (
        <img src={eventInfo.event.extendedProps.icon} alt="" style={{ width: '50%', height: '50%' }} />
      );
}




function transformData(apps) {
  const currentDate = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(currentDate.getMonth() + 2);

  let events = [];

  apps.forEach((app) => {
    let startDate = new Date(app.startDate);

    // Determine the number of days to add based on the renewal period
    let daysToAdd;
    switch (app.renewPeriod) {
      case 'weekly':
        daysToAdd = 7;
        break;
      case 'monthly':
        daysToAdd = 30;
        break;
      case 'yearly':
        daysToAdd = 365;
        break;
      case 'daily':
        daysToAdd = 1;
        break;
      default:
        console.error(`Unknown renew period: ${app.renewPeriod}`);
        return;
    }

    // Add events for each renew period until two months from now
    while (startDate < twoMonthsFromNow) {
      events.push({
        title: app.name,
        start: startDate.toISOString(),
        icon: app.icon,
        id: app._id,
      });

      // Add the appropriate number of days to the start date
      startDate.setDate(startDate.getDate() + daysToAdd);
    }
  });

  return events;
}

  
  

export default CalendarComponent;
