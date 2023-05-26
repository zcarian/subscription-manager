import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import NavBar from "../components/NavBar/index.js";
import { SessionProvider } from "next-auth/react"
import LabelBottomNavigation  from "../components/BottomNav/BottomNav";
import ResponsiveAppBar from "../components/AppBar/AppBar.js";

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
      <ResponsiveAppBar/>
      <LabelBottomNavigation position="fixed"/>
      <GlobalStyle />
      <Component {...pageProps} />    
    </SWRConfig>
    </SessionProvider>
  );
}
