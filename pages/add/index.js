import Form from "../../components/Form";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react";

export default function AddEntryPage() {
    const router = useRouter();


    async function addApp(entryData) {
      const response = await fetch("/api/subscribed-apps", {
          method: "POST",
          body: JSON.stringify({ ...entryData}),
          headers: {
              "Content-Type": "application/json",
          },
      });
      if (response.ok) {
          await response.json();
          router.push("/subscribed-apps");
      }
  }
  


    return (
        <main>
            <h1>Add New App</h1>
            <Form onSubmit={addApp} />
        </main>
    )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // console.log("session in getserversideprops:",session);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}