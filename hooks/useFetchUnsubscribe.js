import { useState } from 'react';

export default function useFetchUnsubscribe() {
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
  return {steps, loading, handleClick, isUnsubscribeTextVisible}
}