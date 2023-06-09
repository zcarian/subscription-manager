import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import WindowButtons from "../WindowButtons";

const WindowContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:96vw;
    max-height:90vh;
    margin-left:2vw;
    margin-top:2vh;
    background-color:white;
    overflow:auto;
    border: solid 5px #0078D7;
    border-radius: 5px;
    position:relative;
    overflow-x:hidden;
`

const ActionBar = styled.div`
    display:flex;
    width:96vw;
    height: auto;
    background: linear-gradient(to bottom, #0078D7 0%, #4e8fe0 100%);
    justify-content:space-between;
    position:fixed;
    top:2vh;
    left:2vw;
    z-index:2;
    border-radius: 5px;
    border-left: solid 5px #0078D7;
    border-top:  solid 5px #0078D7;
    border-right:  solid 5px #0078D7;
`

const StyledDiv = styled.div`
    height: 100%;
    width: 100%;
`

const Name = styled.h4`
    color: #fff;
    padding-right: auto;
`

export default function Window({children, areButtons, isMirrored, buttons, linkBack, name}){
    return(
        <WindowContainer>
            <ActionBar>
                <Name style={{color: '#fff', margin:'0'}}>{name}</Name>
                <div>
                    <Link href={`${linkBack}`}>
                        <Image src='/previous2.png' alt='previous icon' height={19} width={19}/>
                    </Link>
                    <Link href='/'>
                        <Image src='/Exit.png' alt='exit icon' height={19} width={19}/>
                    </Link>
                </div>
            </ActionBar>
            <StyledDiv>
                {children}
            </StyledDiv>
            {areButtons && <WindowButtons isMirrored={isMirrored} buttons={buttons}/>}
        </WindowContainer>
    )
}