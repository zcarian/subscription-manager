import styled from "styled-components";
import StartMenu from "../components/StartMenu";

const WhiteDiv = styled.div`
    width: 50%;
    height: 100%;
    background-color: #fff;
`

export default function StartPage(){
    return(
        <StartMenu>
            <WhiteDiv/>
        </StartMenu>
    )
}