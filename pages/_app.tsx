import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (args: string) => {
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
  );
}
