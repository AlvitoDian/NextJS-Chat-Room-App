import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };
  return (
    <div
      className="group relative w-full flex justify-center items-center py-2 px-4 border border-[1px] border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-500 cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <Image
        className="w-4 h-4 me-2"
        src="/google.png"
        alt="Google"
        width={100}
        height={100}
      />
      Google
    </div>
  );
}
