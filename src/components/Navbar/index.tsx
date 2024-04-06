import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";

export default function Navbar({ session }) {
  const handleLogout = async () => {
    await signOut();
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200 sticky top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.png" alt="Flowbite Logo" width={30} height={30} />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#6F3EFC]">
            Nimbrunk
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full xxl:flex md:w-auto" id="navbar-default">
          <ul className="bg-white font-medium flex items-center  p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-gray-600 font-[600]">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Contact
              </a>
            </li>

            {session ? (
              <li
                className="relative"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <button
                  id="dropdownNavbarLink"
                  className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto "
                >
                  {session.user.username}
                  <div className="ml-2.5">
                    <Avatar image={session.user.profileImage} />
                  </div>
                  <svg
                    className={`w-2.5 h-2.5 ms-2.5 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdownNavbar"
                  className={`${
                    dropdownOpen ? "block" : "hidden"
                  } absolute top-full left-0 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:divide-gray-600 shadow-lg`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700   "
                    aria-labelledby="dropdownLargeButton"
                  >
                    {session.user.roles.includes("ADMIN") && (
                      <li>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Admin Page
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href={`/user/edit/${session.user.id}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Atur Profil
                      </Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/register"
                    className="text-white bg-[#6F3EFC] border-[2px] border-[#6F3EFC] rounded-full text-sm px-4 py-[7px] text-center -mr-5"
                    aria-current="page"
                  >
                    Daftar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="text-[#6F3EFC] hover:text-white bg-white hover:bg-[#6F3EFC] rounded-full border-[2px] border-[#6F3EFC] text-sm px-4 py-[7px] text-center transition-all duration-500"
                    aria-current="page"
                  >
                    Masuk
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
