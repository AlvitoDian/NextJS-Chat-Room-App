import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AppMainProps = {
  children: React.ReactNode;
};

export default function AppMain(props: AppMainProps) {
  const { children } = props;
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
