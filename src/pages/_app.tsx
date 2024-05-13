import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppMain from "@/layouts/AppMain";
import { SessionProvider } from "next-auth/react";
import { ReceiverProvider } from "@/contexts/ReceiverContext";

export default function App({
  Component,
  pageProps: { session, pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ReceiverProvider>
        <AppMain>
          <Component {...pageProps} />
        </AppMain>
      </ReceiverProvider>
    </SessionProvider>
  );
}
