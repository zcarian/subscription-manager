import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from 'swr';
import DonutChart from "../components/DonutChart";

export default function Home() {
  const { data, isLoading } = useSWR('/api/subscribed-apps');

  const { data: session } = useSession()
  // console.log('Session:', session);
  if (session) {

    return (
      <>
        {/* <AppBar/> */}
        <h3>
          <img src={session.user.image} style={{width: '100px', borderRadius: '50%'}} />
          Signed in as {session.user.name}
        </h3>
        <DonutChart data={data}/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
      <main>
        <h1>Please sing in</h1>  
        <button onClick={() => signIn()}>Sign in</button>   
      </main>
  );
}
