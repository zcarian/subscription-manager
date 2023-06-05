import { Chart } from "react-google-charts";

export default function ColumnChart({data}){

    const chartData =[
        ['App', 'Price', { role: "style" }],
    ];

    const pattern = /^([\w]+\s?[\w]*)(?=\s*|\s*:|$)/;

    data?.apps.forEach((app) => {
        let price = parseFloat(app.price.replace(',', '.'));
        switch(app.renewPeriod) {
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
        let name = app.name.match(pattern);
        let formatedName
        name ? formatedName = name[0].trim() : formatedName = app.name;
        chartData.push([formatedName, Number(price.toFixed(2)),'#' + Math.floor(Math.random()*16777215).toString(16)]);
    });

    const options = {
        vAxis: {
            title: 'Price in PLN',
        },
        hAxis: {
            title: 'Apps',
            textStyle: {
                fontSize: 10,
            },
        },
        legend: 'none',
    };

  return (
    <Chart 
     chartType="ColumnChart" 
     width="100%" 
     height="400px" 
     data={chartData} 
     options={options} 
    />
  );
}
