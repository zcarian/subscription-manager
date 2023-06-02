import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #235dda;
  z-index: 2000;
  display: flex;
  `

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3vh;
  background: linear-gradient(to bottom, #5499f5 0%, #0078D7 15%, #0078D7 100%);
  color: white;
  /* padding: 0 15px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 2000;
`;

const StartButton = styled.button`
  background: linear-gradient(to bottom, #248421 0%, #279a25 100%);
  border: none;
  color: white;
  height: 100%;
  padding: 5px 20px 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin: 4px 2px; */
  cursor: pointer;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  /* border-radius: 3px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-shadow: inset -2px -2px 6px rgba(0, 0, 0, 0.5);
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;
export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('');
  const { push } = useRouter();
  const {data: session} = useSession();

  const handleChange = (event, newValue) => {
    console.log('newValue:', newValue);
    push(`/${newValue}`);
    setValue(newValue);
  };

  return (
    <Navbar>
      <StartButton onClick={()=>{push('/start')}}>Start</StartButton>
      {session && (
        <NavItems>
          <NavItem>NavItem 1</NavItem>
          <NavItem>NavItem 2</NavItem>
          <NavItem>NavItem 3</NavItem>
        </NavItems>
      )}
    </Navbar>
    // <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom:0, zIndex:2000, backgroundColor:'blue'}} value={value} onChange={handleChange} >
    //   <BottomNavigationAction
    //     sx={{backgroundColor:'green', color:'white'}}
    //     label="Your Subscriptions"
    //     value="subscribed-apps"
    //     icon={<AppsIcon />}
    //   />
    //   <BottomNavigationAction
    //     label="Add"
    //     value="add"
    //     icon={<AddCircleIcon />}
    //   />
    //   <BottomNavigationAction
    //     label="Calendar"
    //     value="calendar"
    //     icon={<CalendarMonthIcon/>}
    //   />
    //   <BottomNavigationAction
    //     label="Profile"
    //     value=""
    //     icon={<AccountBoxIcon/>}
    //   />
    // </BottomNavigation>
  );
}