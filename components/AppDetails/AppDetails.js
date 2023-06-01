import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Image from 'next/image';
import useFetchUnsubscribe from '../../hooks/useFetchUnsubscribe';

export default function AppDetails({app, deleteApp}) {

  const {push} = useRouter();

  const {steps, loading, isUnsubscribeTextVisible, handleClick} = useFetchUnsubscribe();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{textAlign:'center'}}><h3>{app.name}</h3></Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Image src={app.icon} alt={app.name} width={100} height={100} />
        </Grid>
        <Grid item xs={8} sx={{fontSize:'large'}}>
          <Typography>{`Started on ${app.startDate}`}</Typography>
          <Typography>{`${app.endDate && `and ends on ${app.endDate}`} `}</Typography>
          <Typography sx={{fontSize:'large'}}>{`${app.price} ${app.currency} paid ${app.renewPeriod}`}</Typography>
        </Grid>
        <Grid item xs={3} sx={{textAlign:'center'}}>
          <Button variant='contained' onClick={deleteApp} >Delete</Button>
        </Grid>
        <Grid item xs={3} sx={{textAlign:'center'}}>
          <Button variant='contained' onClick={()=>{push(`/subscribed-apps/${app._id}/edit`)}}>Edit</Button>
        </Grid>
        <Grid item xs={6} sx={{textAlign:'center'}}>
          <Button variant='contained' onClick={()=>handleClick(app.name)}>
            {loading ? 'Loading...' : 'How to unsubscribe'}
          </Button>
        </Grid>
        {isUnsubscribeTextVisible && 
          <Grid item xs={12} sx={{textAlign:'center'}}>
            <ul>
              {steps?.map((step, index) => (
                <li key={index}>{step}
                </li>
              ))}
            </ul>
          </Grid>
        }
      </Grid>
    </Box>
  );
}
