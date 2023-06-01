import { useState } from 'react';
import Button from '@mui/material/Button';

function UnsubscribeButton({appName}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `tell me in simple steps how to unsubscribe from ${appName}`
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.choices[0].text);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Button variant='contained' onClick={handleClick}>
      How to unsubscribe
    </Button>
  );
}

export default UnsubscribeButton;
