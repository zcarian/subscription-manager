import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';

export default function ColumnChart({data}){

    const chartData =[
        ['App', 'Price', { role: "style" }],
    ];

    data?.apps.forEach((obj) => {
        let price = parseFloat(obj.price.replace(',', '.'));
        switch(obj.renewPeriod) {
            case "yearly":
                price = price / 12;
            break;
            case "weekly":
                price = price * 4;
            break;
            case "daily":
                price = price * 30;
            break;
            default:
                price = price;
        }
        chartData.push([obj.name, Number(price.toFixed(2)),'#' + Math.floor(Math.random()*16777215).toString(16)]);
    });

    const options = {
        vAxis: {
            title: 'PLN',
        },
    };

  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={chartData} options={options} />
  );
}
