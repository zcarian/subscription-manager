import { useSession, signIn, signOut } from "next-auth/react"
import  LabelBottomNavigation  from "../components/BottomNav/BottomNav";
import ResponsiveAppBar from "../components/AppBar/AppBar";

export default function Home() {

  const { data: session } = useSession()
  console.log('Session:', session);
  if (session) {
    return (
      <>
        {/* <AppBar/> */}
        <h3>
          <img src={session.user.image} style={{width: '100px', borderRadius: '50%'}} />
          Signed in as {session.user.name}
        </h3> 
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <LabelBottomNavigation />
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
