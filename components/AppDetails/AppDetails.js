import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { useRouter } from "next/router";
import Buttom from '@mui/material/Button';
import { Typography } from '@mui/material';
import Image from 'next/image';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({app, deleteApp}) {
    const {push} = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{textAlign:'center'}}><h3>{app.name}</h3></Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} >
            <Image 
                src={app.icon} 
                alt={app.name} 
                width={100} 
                height={100}
            />
            {/* <Avatar 
                src={app.icon} 
                alt={app.name} 
                sx={{ width: 60, height: 60, }}
            /> */}
        </Grid>
        <Grid item xs={8} sx={{fontSize:'large'}}>         
          <Typography>
          {`Started on ${app.startDate}`}
          </Typography>
          <Typography>
          {`${app.endDate && `and ends on ${app.endDate}`} `}
          </Typography>
          <Typography sx={{fontSize:'large'}}>
          {`${app.price} ${app.currency} piad ${app.renewPeriod}`}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{textAlign:'center'}}>
          <Buttom variant='contained' onClick={deleteApp} >Delete</Buttom>
        </Grid>
        <Grid item xs={3} sx={{textAlign:'center'}}>
          <Buttom variant='contained' onClick={()=>{push(`/subscribed-apps/${app._id}/edit`)}}>Edit</Buttom>
        </Grid>
        <Grid item xs={6} sx={{textAlign:'center'}}>
            <Buttom variant='contained'>How to unsubscribe</Buttom>
        </Grid>    
      </Grid>
    </Box>
  );
}