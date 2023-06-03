import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const WindowContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:96vw;
    max-height:90vh;
    /* position:absolute;
    top: 2vh;
    left: 4vw; */
    margin-left:2vw;
    margin-top:2vh;
    background-color:white;
    overflow:auto;
    border: solid 5px #0078D7;
    border-radius: 5px;
    position:relative;
`

const ActionBar = styled.div`
    display:flex;
    width:96vw;
    /* padding-top:5px;
    padding-right:5px; */
    height: auto;
    background: linear-gradient(to bottom, #0078D7 0%, #4e8fe0 100%);
    justify-content:end;
    position:fixed;
    top:2vh;
    left:2vw;
    z-index:2;
    border-radius: 5px;
    border-left: solid 5px #0078D7;
    border-top:  solid 5px #0078D7;
    border-right:  solid 5px #0078D7;
`

export default function Window({children}){
    return(
        <WindowContainer>
            <ActionBar>
                <Link href='/start'>
                    <Image src='/Exit.png' alt='exit icon' height={19} width={19}/>
                </Link>
            </ActionBar>
            <div>
            {children}
            </div>
        </WindowContainer>
    )
}