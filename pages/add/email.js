import { useState } from 'react';

export default function ScanEmailPage() {
  const [email, setEmail] = useState('');

  const handleScan = async () => {
    const response = await fetch('/api/scan');
    const data = await response.json();
    setEmail(data);
  };

    console.log("email", email);
  return (
    <div>
      <button onClick={handleScan}>Scan for subscriptions</button>
      <p>halo</p>
    </div>
  );
}