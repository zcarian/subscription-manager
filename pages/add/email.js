import { useState } from 'react';
import AppList from '../../components/AppList/';
import { useRouter } from 'next/router';
import Window from '../../components/Window';
import styled from 'styled-components';
import Image from 'next/image';

const StyledP = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  `

const StyledButton = styled.button`
  width: 50%;
  text-decoration: none;
  color: black;
  border: none;
  position: sticky;
  bottom:0;  
  left:0;
  background-color:#d3e5fb;
  height: 6vh;
  border-top: 5px solid #0078D7;
  border-left: 5px solid #0078D7;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.5rem;
`

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
    <Window linkBack={'/subscribed-apps'}> 
      {emailData ?( 
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
          <AppList apps={emailData} />
          <StyledButton onClick={addAppFromScan}>
            <Image src='/add.png' alt='add icon' width={40} height={40}/>  
            <p>Add apps</p>
          </StyledButton>
        </div>
      ):(<StyledP>Loading...</StyledP>)
        }
    </Window>
  );
}