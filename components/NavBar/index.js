import Link from 'next/link';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';

const StyledNav = styled.nav`
    display: flex;
    padding: 1rem;
    justify-content: space-around;
    background-color: #000;
    `

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    `

const StyledDiv = styled.div`
    color: #fff;    
    font-size: 1.2rem;
    font-weight: 600;
    `
    
export default function NavBar() {

  const { data: session } = useSession()

    return (
        <>
        {session && (
            <StyledNav>
                <StyledLink href="/">
                    My Profile
                </StyledLink>
                <StyledLink href="/add">
                    Add App
                </StyledLink>
                <StyledLink href="/subscribed-apps">
                    Subscribed Apps
                </StyledLink>
           </StyledNav>
            )
        }
        </>        
    );
}