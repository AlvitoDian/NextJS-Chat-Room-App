import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

type AppMainProps = {
  children: React.ReactNode;
};

export default function AppMain(props: AppMainProps) {
  const { children } = props;
  const { data: session, status } = useSession() as any;

  if (status === "loading") {
    return;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
