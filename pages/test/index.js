import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {

  const { data: session } = useSession()

  // console.log(session)

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
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}