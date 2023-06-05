import styled from "styled-components";
import Link from 'next/link'
import Image from 'next/image'

const pages =[
    {
        name: 'Your apps',
        path: '/subscribed-apps',
        icon:'/apps.png',
    },
    {
        name: 'Charts',
        path: '/charts/summary',
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
`

const Icon = styled(Image)`
    margin-right: 10px;
`

export default function NavList(){
    return(
        <NavListContainer>
            <NavItems>
                {pages.map((page, index) => (
                    <NavItem key={index}>
                        <StyledLink href={page.path}>
                            <Icon src={page.icon} alt={`${page.name} icon`} width={40} height={40} />
                            {page.name}
                        </StyledLink>   
                    </NavItem>
                ))}
            </NavItems>    
        </NavListContainer>
    )
}