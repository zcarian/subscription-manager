import Link from 'next/link';
import styled from 'styled-components';

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

export default function NavBar() {
    return (
        <StyledNav>
            <StyledLink href="/">
                Home
            </StyledLink>
            <StyledLink href="/add">
                 Add App
            </StyledLink>
            <StyledLink href="/subscribed-apps">
                Subscribed Apps
            </StyledLink>
        </StyledNav>
    );
}