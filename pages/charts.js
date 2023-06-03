import styled from "styled-components";
import Window from "../components/Window";
import ChartMenu from "../components/ChartMenu/"
import useSWR from 'swr'

export default function (){
    const { data, isLoading } = useSWR('/api/subscribed-apps');    

    return (
        <Window >
            <ChartMenu data={data}/>
        </Window>
    )
}