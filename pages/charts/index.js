import React, { useState } from 'react';
import Window from "../../components/Window";
import useSWR from 'swr'
import BarChartComponent from "../../components/BarChart";
import DonutChart from "../../components/DonutChart";
import ColumnChart from "../../components/ColumnChart";
import { useRouter } from 'next/router'

export default function ChartsPage() {
  const { push } = useRouter();
  const { data, isLoading } = useSWR('/api/subscribed-apps');
  const [chartNumber, setChartNumber] = useState(0);

  const buttons = [
    {
      name: 'Previous',
      icon: '/previous1.png',
      onClick() {
        let newChartNumber = chartNumber - 1;
        if (newChartNumber < 0) {
          newChartNumber = 2;
        }
        setChartNumber(newChartNumber);
      }
    },
    {
      name: 'Next',
      icon: '/next1.png',
      onClick() {
        let newChartNumber = chartNumber + 1;
        if (newChartNumber > 2) {
          newChartNumber = 0;
        }
        setChartNumber(newChartNumber);
      }
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  let chartComponent;

  if (chartNumber === 0) {
    chartComponent = <BarChartComponent data={data} />;
  } else if (chartNumber === 1) {
    chartComponent = <ColumnChart data={data} />;
  } else {
    chartComponent = <DonutChart data={data} />;
  }

  return (
    <Window areButtons={true} isMirrored={true} buttons={buttons}>
      {chartComponent}
    </Window>
  );
}
