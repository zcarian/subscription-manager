import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { useRouter } from 'next/router';

const CalendarComponent = ({ apps }) => {
    const {push} = useRouter();

  const events = transformData(apps);

  function handleEventClick(info) {

    console.log(info.event.id);
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




// Transform data function
function transformData(apps) {
    const events = [];
  
    apps.forEach(app => {
      const { name, icon, startDate, _id, renewPeriod } = app;
      const start = new Date(startDate);
      const title = name;
      const id = _id;
  
      // Determine the number of months to add based on renewPeriod
      const monthsToAdd = renewPeriod === 'monthly' ? 1 : 12;
  
      // Initialize nextRenewalDate as the startDate
      let nextRenewalDate = new Date(start);
  
      // Get the date two months from now
      const twoMonthsFromNow = new Date();
      twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
  
      // Loop until nextRenewalDate is more than two months in the future
      while (nextRenewalDate <= twoMonthsFromNow) {
        // Create an event for nextRenewalDate
        events.push({
          title,
          start: new Date(nextRenewalDate),  // create a new Date object to avoid mutation
          icon,
          id
        });
  
        // Add monthsToAdd to nextRenewalDate
        nextRenewalDate.setMonth(nextRenewalDate.getMonth() + monthsToAdd);
      }
    });
  
    return events;
  };
  
  

export default CalendarComponent;
