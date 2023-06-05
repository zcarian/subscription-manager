import styled from "styled-components";
import Image from 'next/image'
import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton";

const StartMenuContainer = styled.div`
    height:55vh;
    width: 80vw;
    background-color: #d3e5fb;
    position: absolute;
    left: 0;
    bottom:3vh;
    border-right: 4px solid #0078D7;
    border-bottom: 8px solid #0078D7;
    border-top-right-radius: 10px;
`

const ProfileContainer = styled.div`
    width: 100%;
    height: 10vh;
    background: linear-gradient(to bottom, #0078D7 0%, #4e8fe0 100%);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-right-radius: 10px;
`
const ProfilePic = styled(Image)`
    border: 2px solid #fff;
    height: 4rem;
    width: 4rem;
    margin-left: 2vw;
    margin-right: 3vw;
`

export default function StartMenu({children}){
    const {data: session} = useSession();

    return(
        <StartMenuContainer>
            <ProfileContainer>
                <ProfilePic src=
                    {session ? 
                    (session.user.image) :
                    ('/blankProfile.png')}
                alt="profilePic" 
                width={50} 
                height={50} />
                <h3 style={{marginLeft: '2vw', color: '#fff'}}>
                    {session?(session.user.name):('Guest')}
                </h3>
            </ProfileContainer>
            <LoginButton/>
            {children}
        </StartMenuContainer>      
    )
}