import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const WindowContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:92vw;
    max-height:90vh;
    position:absolute;
    top: 2vh;
    left: 4vw;
    background-color:white;
    overflow:auto;
    border: solid 5px #0078D7;
    border-radius: 5px;
`

const ActionBar = styled.div`
    display:flex;
    width:100%;
    height: auto;
    background: linear-gradient(to bottom, #0078D7 0%, #4e8fe0 100%);
    justify-content:end;
`

export default function Window({children, ClosePath}){
    return(
        <WindowContainer>
            <ActionBar>
                <Link href={ClosePath}>
                    <Image src='/Exit.png' alt='exit icon' height={19} width={19}/>
                </Link>
            </ActionBar>
            {children}
        </WindowContainer>
    )
}