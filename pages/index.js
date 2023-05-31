import { useSession, signIn} from "next-auth/react"
import useSWR from 'swr';
import DonutChart from "../components/DonutChart";
import ColumnChart from "../components/ColumnChart";

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
        <DonutChart data={data}/>
        <ColumnChart data={data}/>
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