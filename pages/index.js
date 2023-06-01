import { useSession, signIn} from "next-auth/react"
import useSWR from 'swr';
import ChartMenu from "../components/ChartMenu";

export default function Home() {
  const { data, isLoading } = useSWR('/api/subscribed-apps');

  const { data: session } = useSession()
  if (session) {

    return (
      <>
        <h3>
          <img src={session.user.image} style={{width: '100px', borderRadius: '50%'}} />
          Signed in as {session.user.name}
        </h3>
        <ChartMenu data={data}/>
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