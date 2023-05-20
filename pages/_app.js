import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import NavBar from "../components/NavBar/index.js";
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    <SWRConfig
      value={{
        fetcher: async (args) => {
          const response = await fetch(args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    > 
      <NavBar/>
      <GlobalStyle />
      <Component {...pageProps} />    
    </SWRConfig>
    </SessionProvider>
  );
}
