import styled from "styled-components";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const pages =[
    {
        name: 'Your apps',
        path: '/subscribed-apps',
        icon:'/apps.png',
    },
    {
        name: 'Charts',
        path: '/charts',
        icon:'/chart.png',
    },
    {
        name: 'Calendar',
        path: '/calendar',
        icon:'/calendar.png',
    },
]

const NavListContainer = styled.div`
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-right: 2px solid #95BDEE;
    padding-top: 10vh;  
`

const NavItems = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const NavItem = styled.li`
    padding: 10px;
    height: 6vh;
    border-bottom: 1px solid #95BDEE;
    font-family: 'Tahoma', sans-serif;
    display: flex;
    align-items: center;
`

const StyledButton = styled.button`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    width: 100%;
`

const Icon = styled(Image)`
    margin-right: 10px;
`

export default function NavList(){

    const {data: session} = useSession();

    // console.log(session);

    const {push} = useRouter();

    return(
        <NavListContainer>
            <NavItems>
                {pages.map((page, index) => (
                    <NavItem key={index}>
                        <StyledButton onClick={()=>{session ? (push(page.path)):(alert('You are not Logged in'))}}>
                            <Icon src={page.icon} alt={`${page.name} icon`} width={40} height={40} />
                            {page.name}
                        </StyledButton>   
                    </NavItem>
                ))}
            </NavItems>    
        </NavListContainer>
    )
}