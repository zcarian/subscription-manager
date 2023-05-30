import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function AppList({apps}) {
    const { push } = useRouter();
  return (
    <List sx={{ width: '100%', bgcolor: 'yellow', paddingTop:0}} position='sticky'>
        {apps.map((app, index) => (
            <React.Fragment>
                <ListItem alignItems="center" onClick={()=>{push(`/subscribed-apps/${app._id}`)}}>
                <ListItemAvatar>
                    <Avatar alt={app.name} src={app.icon} />
                </ListItemAvatar>
                <ListItemText sx={{alignItems:'center'}}
                    primary={app.name}
                    // secondary={
                    //     <Typography
                    //         sx={{ display: 'inline' }}
                    //         component="span"
                    //         variant="body2"
                    //         color="text.primary"
                    //     >
                    //         Started on {app.startDate} {app.endDate && `and ends on ${app.endDate}`}
                    //     </Typography>             
                    // }
                />
                <ListItemText
                    primary={`${app.price} ${app.currency}`}
                    secondary={app.renewPeriod}
                    sx={{ textAlign: 'right'}}
                />
                </ListItem>
                <Divider variant="middle" component="li" />
            </React.Fragment>
        ))}
        {/* <ListItem  alignItems="flex-start">
            <ListItemText
                primary=""
                sx={{ textAlign: 'right'}}  
            />            
        </ListItem> */}

    </List>
  );
}      
