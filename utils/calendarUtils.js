export function transformData(apps, isInTwoMonths = false) {
    const currentDate = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(currentDate.getMonth() + 2);
  
    const referenceDate = isInTwoMonths ? twoMonthsFromNow : currentDate;

    let events = [];
  
    apps.forEach((app) => {
      let startDate = new Date(app.startDate);
  
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
  
      while (startDate < referenceDate) {
        events.push({
          title: app.name,
          start: startDate.toISOString(),
          icon: app.icon,
          id: app._id,
          price: app.price,
          currency: app.currency,
        });
  
        startDate.setDate(startDate.getDate() + daysToAdd);
      }
    });
    return events;
  }

  export function renderEventContent(eventInfo) {
    return (
      <img src={eventInfo.event.extendedProps.icon} alt="" style={{ width: '50%', height: '50%' }} />
    );
  }