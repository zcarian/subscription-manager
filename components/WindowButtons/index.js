import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const ButtonsContainer = styled.div`
    display:flex;
    position: sticky;
    bottom:0;  
    left:0;
    background-color:#d3e5fb;
    width:auto;
    /* border-left:solid 5px #0078D7;
    border-right:solid 5px #0078D7; */
    border-top:solid 5px #0078D7;
    height: auto;
    `

const ButtonDivider= styled.div`
    border-right:solid 5px #0078D7;
`

const StyledButton = styled.button`
    width: 50%;
    height: 6vh;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-top: 2px solid #95BDEE;
    text-decoration:none;
    color:'black';
`

export default function WindowButtons({buttons, isMirrored}){

    return (
        <ButtonsContainer>
            <StyledButton onClick={()=>{buttons[0].onClick()}}>
                <Image src={buttons[0].icon} alt={`${buttons[0].name} icon`} width={40} height={40}/>
                <p>{buttons[0].name}</p>
            </StyledButton>
            <ButtonDivider/>
            <StyledButton onClick={()=>{buttons[1].onClick()}}>
                {isMirrored?(<p>{buttons[1].name}</p>):(<></>)}
                <Image src={buttons[1].icon} alt={`${buttons[1].name} icon`} width={40} height={40}/>
                {isMirrored?(<></>):(<p>{buttons[1].name}</p>)}
            </StyledButton>
        </ButtonsContainer>
    )

    // return(
    //     <ButtonsContainer>
    //         <StyledButton onClick={()=>{push('/add/form')}}>
    //             <Image src='/type.png' alt='fill form icon'
    //             width={40} height={40}/>
    //             <p>Add app</p>
    //         </StyledButton>
    //         <ButtonDivider/>
    //         <StyledButton href='/add/email'>
    //             <Image src='/scan1.png' alt='scan email icon' width={40}height={40}/>
    //             <p>Check your emails</p>
    //         </StyledButton>
    //     </ButtonsContainer>
    // )
}