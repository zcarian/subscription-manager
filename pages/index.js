import styled from 'styled-components';

const StartMenu = styled.div`
  width: 200px;
  height: 300px;
  background-color: #5d6d7f;
  border: 1px solid #000;
  position: absolute;
  bottom: 30px;
  left: 30px;
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-family: 'Tahoma', sans-serif;
  
  &:hover {
    background-color: #316ac5;
  }
`;

const MenuLogo = styled.img`
  width: 30px;
  height: 30px;
`;

export default function Home() {
    return (
        <></>
        // <StartMenu>
        //   <MenuItem>
        //     <MenuLogo src="/path/to/logo.jpg" alt="logo" />
        //     Program 1
        //   </MenuItem>
        //   <MenuItem>
        //     <MenuLogo src="/path/to/logo.jpg" alt="logo" />
        //     Program 2
        //   </MenuItem>
        //   {/* add more menu items as necessary */}
        // </StartMenu>
      );
}