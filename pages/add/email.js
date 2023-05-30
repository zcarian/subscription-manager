import { useState } from 'react';
import AppList from '../../components/AppList/AppList';

export default function ScanEmailPage() {
  const [emailData, setEmailData] = useState('');

  const handleScan = async () => {
    const response = await fetch('/api/scan');
    const data = await response.json();
    setEmailData(data);
  };

    // console.log("email", email);
  return (
    <div>
      <button onClick={handleScan}>Scan for subscriptions</button>
      {emailData && <AppList apps={emailData} />}
    </div>
  );
}