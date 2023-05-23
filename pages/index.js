import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <h3>
          <img src={session.user.image} style={{width: '100px', borderRadius: '50%'}} />
          Signed in as {session.user.name}
        </h3> 
        <br />
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
