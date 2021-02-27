import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.scss";
import "../styles/card.scss";
import "../styles/logo.scss";
import "../styles/search-bar.scss";
import "../styles/recipes.index.scss";
import "../styles/recipes.id.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
