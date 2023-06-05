import { useState } from 'react';
import AppList from '../../components/AppList/';
import { useRouter } from 'next/router';
import Window from '../../components/Window';

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
    const response = await fetch('/api/email');
    const data = await response.json();
    for (let app of data) {
      let searchTerm = app.name.match(/^(\w+)/)[0];
      // console.log(searchTerm);
      const response = await fetch(`/api/test?term=${searchTerm}&num=1`);
      const searcheData = await response.json();
      if(searcheData.length > 0) {
      // console.log(searcheData[0]);
      app.icon = searcheData[0].icon;
      app.category = searcheData[0].primaryGenre;
      // console.log('app:',app);
      }
    }
    setEmailData(data);
  };

    // console.log("email", emailData);
  handleScan();
  return (
    <Window>
      {emailData ?( 
        <>
          <AppList apps={emailData} />
          <button onClick={addAppFromScan}>Add apps</button>
        </>
      ):(<p>Loading...</p>)
        }
    </Window>
  );
}