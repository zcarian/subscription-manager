import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function AppList({apps}) {
    const { push } = useRouter();
  return (
    <List sx={{ width: '100%', bgcolor: 'white', paddingTop:'2vh', paddingBottom:'0px'}} position='sticky'>
        {apps.map((app, index) => (
            <React.Fragment>
                <ListItem alignItems="center" key={index} onClick={()=>{push(`/subscribed-apps/${app._id}`)}}>
                <ListItemAvatar>
                    <Image alt={app.name} src={app.icon} height={50} width={50} style={{border:'2px solid #0078D7'}}/>
                </ListItemAvatar>
                <ListItemText 
                    sx={{alignItems:'center'}}
                    primary={app.name}
                />
                <ListItemText
                    primary={`${app.price} ${app.currency}`}
                    secondary={app.renewPeriod}
                    sx={{ textAlign: 'right'}}
                />
                </ListItem>
                {index+1!==apps.length && <Divider  component="li" />}
            </React.Fragment>
        ))}
    </List>
  );
}      
