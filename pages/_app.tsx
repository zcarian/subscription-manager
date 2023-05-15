import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
