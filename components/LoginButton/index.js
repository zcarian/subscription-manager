import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"
import styled from "styled-components"
import Image from 'next/image'

const StyledButton = styled.button`
    width: 50%;
    height: 6vh;
    background: none;
    border: none;
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-top: 2px solid #95BDEE;
`

export default function LoginButton(){
    const { data: session } = useSession()

    return(
        <StyledButton onClick={session?(()=>signOut()):()=>signIn()}>
            <Image src='/Logout.png' alt="Log icon" width={40}  height={40}/>
            <p>{session ? 'Log off':'Log in'}</p>
        </StyledButton>
    )

}