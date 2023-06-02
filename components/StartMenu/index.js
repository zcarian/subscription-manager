import styled from "styled-components";
import Image from 'next/image'
import { useSession } from "next-auth/react";

const StartMenuContainer = styled.div`
    height:95vh;
    width: 95vw;
    background-color: #d3e5fb;
    position: absolute;
    left: 0;
    bottom:3vh;
    border-right: 4px solid #0078D7;
    border-bottom: 8px solid #0078D7;
`

const ProfileContainer = styled.div`
    width: 100%;
    height: 10vh;
    /* background-color: #0078D7; */
    background: linear-gradient(to bottom, #0078D7 0%, #4e8fe0 100%);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const ProfilePic = styled(Image)`
    border: 2px solid #fff;
    height: 4rem;
    width: 4rem;
    margin-left: 2vw;
`

export default function StartMenu({children}){
    const {data: session} = useSession();

    let image = '/blankProfile.png'
    if(session){
        image = session.user.image
    }
    return(
        <>
        <StartMenuContainer>
            <ProfileContainer>
                <ProfilePic src={image} alt="profilePic" width={50} height={50} />
                {session && <h3 style={{marginLeft: '2vw', color: '#fff'}}>{session.user.name}</h3>}
            </ProfileContainer>
            {children}
        </StartMenuContainer>
        </>
    )
}