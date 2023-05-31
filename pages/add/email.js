import { useState } from 'react';
import AppList from '../../components/AppList/AppList';
import { useRouter } from 'next/router';

export default function ScanEmailPage() {
  const router = useRouter();

  const [emailData, setEmailData] = useState('');

  async function addAppFromScan() {
    const response = await fetch("/api/subscribed-apps/fromScan", {
        method: "POST",
        body: JSON.stringify({ emailData}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        await response.json();
        router.push("/subscribed-apps");
    }
  }

  const handleScan = async () => {
    const response = await fetch('/api/scan');
    const data = await response.json();
    setEmailData(data);
  };

    // console.log("email", email);
  return (
    <div>
      <button onClick={handleScan}>Scan for subscriptions</button>
      {emailData && 
        <>
          <AppList apps={emailData} />
          <button onClick={addAppFromScan}>Add apps</button>
        </>
        }
    </div>
  );
}