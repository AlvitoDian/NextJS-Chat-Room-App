import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    // Jika session status adalah 'authenticated', redirect ke halaman utama.
    if (session && status === "authenticated") {
      router.push("/");
    } else {
      setIsLoadingPage(false);
    }
  }, [session, status]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user.username || !user.email || !user.password) {
      setError("Must provide all the credentials");
    }
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsLoading(false);
        setUser({
          username: "",
          email: "",
          password: "",
        });
        router.push("/auth/login");
        console.log(user);
      } else {
        const errorMessage = response.data.message;
        console.log("Signup failed", errorMessage);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log("Signup failed", error.message);
    }
  };

  if (isLoadingPage) {
    return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#e1daf7]">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg p-10 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Daftar untuk bergabung
          </h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Tambahkan input untuk username */}
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={user.username}
                onChange={handleChange}
                className="bg-gray-100 rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              value={user.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Alamat Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={user.password}
              onChange={handleChange}
              className="bg-gray-100 rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {error && (
            <div className="bg-red-600 border text-white px-4 py-2 rounded-md mt-5">
              {error}
            </div>
          )}

          <div className="flex flex-col">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6F3EFC] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Daftar"
              )}
            </button>
            <div className="flex justify-center pt-5">
              <div className="text-sm">
                <span className="text-gray-500 font-medium">
                  Sudah punya akun ?
                </span>
                <Link
                  href={"/auth/login"}
                  className="pl-1 font-semibold text-[#6F3EFC]"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
