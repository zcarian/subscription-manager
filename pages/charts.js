import styled from "styled-components";
import Window from "../components/Window";
import ChartMenu from "../components/ChartMenu/"
import WindowButtons from "../components/WindowButtons";
import useSWR from 'swr'
import ColumnChart from "../components/ColumnChart";
import DonutChart from "../components/DonutChart";

const buttons =[
    {
      name:'Add new app',
      path:'/add/form',
      icon:'/type.png'
    },
    {
      name:'Check your emails',
      path:'/add/email',
      icon:'/scan1.png'
    }
  ]

export default function (){
    const { data, isLoading } = useSWR('/api/subscribed-apps');    

    if (isLoading) return <div>Loading...</div>;

    return (
        <Window >
            <ChartMenu data={data}/>
            {/* <WindowButtons isMirrored={true} /> */}
        </Window>
    )
}