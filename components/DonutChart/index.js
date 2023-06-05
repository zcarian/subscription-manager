import React from "react";
import { Chart } from "react-google-charts";

export const options = {
    title: "Avrage monthly spending",
    pieHole: 0.4,
    is3D: false,
}

export default function DonutChart({data}) {

    let categories = {
        "Education": 0,
        "Entertainment": 0,
        "Utilities": 0,
        "Productivity": 0,
        "Music": 0,
        "Finance": 0
    };
  
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
      
        categories[obj.category] += price;
    });
  
    let chartData = [["Category", "Average Monthly Spending"]];
  
    for (let key in categories) {
        chartData.push([key, Number(categories[key].toFixed(2))]);
    }

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="200px"
            data={chartData}
            options={options}
        />
    )
}