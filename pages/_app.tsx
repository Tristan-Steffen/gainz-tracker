import type { AppProps } from 'next/app';
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import '../styles/globals.css';
NProgress.configure({ showSpinner: false })

let timeout: string | number | NodeJS.Timeout | undefined;

function startProgress() {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => NProgress.start(), 500)
}
function endProgress() {
  clearTimeout(timeout);
  NProgress.done();
}

Router.events.on('routeChangeStart', startProgress);
Router.events.on('routeChangeComplete', endProgress);
Router.events.on('routeChangeError', endProgress);

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
  </>
}

export default MyApp
