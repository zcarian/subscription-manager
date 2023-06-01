import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from "next/router";
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Image from 'next/image';

export default function AppDetails({app, deleteApp}) {
  const {push} = useRouter();
  const [unsubscribeText, setUnsubscribeText] = useState(null);
  const [isUnsubscribeTextVisible, setIsUnsubscribeTextVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async (appName) => {
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Please outline a detailed, step-by-step guide on the process of canceling a subscription to ${appName}. The steps should be straightforward, precise, and devoid of any superfluous details. Give only short sentences ended with dot, without numbers or bullet points. In your response please don't include new line symbols`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUnsubscribeText(data.choices[0].text);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    setIsUnsubscribeTextVisible(true);
  };

  let steps = unsubscribeText?.split('. ').map((step, index) => {
    if (index < unsubscribeText?.split('. ').length - 1) {
      return step + '.';
    }
    return step;
  });

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
