import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppMain from "@/layouts/AppMain";
import { SessionProvider } from "next-auth/react";
import { ReceiverProvider } from "@/contexts/ReceiverContext";
import { FriendListsProvider } from "@/contexts/FriendListsContext";
export default function App({ Component, pageProps }: AppProps) {
  const { session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <ReceiverProvider>
        <FriendListsProvider>
          <AppMain>
            <Component {...restPageProps} />
          </AppMain>
        </FriendListsProvider>
      </ReceiverProvider>
    </SessionProvider>
  );
}
