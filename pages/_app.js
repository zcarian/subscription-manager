import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import NavBar from "../components/NavBar/index.js";
import { SessionProvider } from "next-auth/react"
import LabelBottomNavigation  from "../components/BottomNav";
import ResponsiveAppBar from "../components/AppBar/AppBar.js";
import styled from "styled-components";

const Background = styled.div`
  width: 100%; 
  height: 100vh; 
  background-image:url('/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 0.5vh;
`;


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
      <Background>
      <LabelBottomNavigation position="fixed"/>
      <GlobalStyle />
      <Component {...pageProps} />  
      </Background>  
    </SWRConfig>
    </SessionProvider>
  );
}
