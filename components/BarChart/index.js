import React from 'react';
import { transformData } from '../../utils/calendarUtils';
import { Chart } from "react-google-charts";

export default function BarChartComponent({ data }) {
    
  // console.log(apps);

  const apps = data.apps;
  const events = transformData(apps);

//   console.log(events);

  const howMany = apps.map((app)=>{
    return (
      {
        name:app.name,
        count:events.filter((event)=>event.title===app.name).length
      }
    ) 
  })
  // console.log(howMany);

  const chartData =[
    ['App', 'Price', { role: "style" }],
];

const pattern = /^([\w]+\s?[\w]*)(?=\s*|\s*:|$)/;

apps.forEach((app) => {
    let price = parseFloat(app.price.replace(',', '.'));
    let count = howMany.filter((item)=>item.name===app.name)[0].count;
    let totalPrice = (price * count)
    let name = app.name.match(pattern);
    console.log(name);
    let formatedName
    name ? formatedName = name[0].trim() : formatedName = app.name;
    // console.log(app.name, totalPrice);
    chartData.push([formatedName, Number(totalPrice.toFixed(2)),'#' + Math.floor(Math.random()*16777215).toString(16)]);
});
    const maxPrice = Math.ceil(Math.max(...chartData.slice(1).map((item)=>item[1])) / 100) * 100;

    const options = {
        legend: 'none',
        hAxis: {
            title: 'Total cost (PLN)',
            viewWindow: {
                max: maxPrice,
            },
        },
        title: 'Total cost of each app',
        chartArea: { width: "50%" },
    }

  return (
    <Chart 
     chartType="BarChart" 
     width="100%" 
     height="400px" 
     data={chartData} 
     options={options} 
    />
  )
}
