import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('');
  const { push } = useRouter();
  const {data: session} = useSession();

  const handleChange = (event, newValue) => {
    console.log('newValue:', newValue);
    push(`/${newValue}`);
    setValue(newValue);
  };

  if(session) return (
    <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom:0, zIndex:2000}} value={value} onChange={handleChange} >
      <BottomNavigationAction
        label="Your Subscriptions"
        value="subscribed-apps"
        icon={<AppsIcon />}
      />
      <BottomNavigationAction
        label="Add"
        value="add"
        icon={<AddCircleIcon />}
      />
      <BottomNavigationAction
        label="Calendar"
        value="calendar"
        icon={<CalendarMonthIcon/>}
      />
      <BottomNavigationAction
        label="Profile"
        value=""
        icon={<AccountBoxIcon/>}
      />
    </BottomNavigation>
  );
  return null;
}