import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppMain from "@/layouts/AppMain";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppMain>
        <Component {...pageProps} />
      </AppMain>
    </SessionProvider>
  );
}
