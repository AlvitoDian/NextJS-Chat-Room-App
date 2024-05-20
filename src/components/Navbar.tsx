import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { data: session } = useSession() as any;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white border-[#e6defc] border-b-[1px] sticky top-0 z-[999]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/logo.png" alt="Nimbrunk Logo" width={30} height={30} />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-[#6F3EFC]">
            Nimbrunk
          </span>
        </Link>
        {/* Mobile Menu */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
          onClick={toggleSidebar}
        >
          <div className="flex item-center flex-col justify-center relative">
            <span
              className={`${
                isSidebarOpen ? "h-0 -translate-y-[5px]" : "h-0.5"
              } origin-top-left transition-all duration-100 w-5 bg-gray-500 `}
            ></span>

            <span
              className={`${
                isSidebarOpen ? "rotate-45" : ""
              } origin-center transition-all duration-300 w-5 h-0.5 bg-gray-500 mt-[5px] -mb-[7px] `}
            ></span>
            <span
              className={`${
                isSidebarOpen ? "-rotate-45" : ""
              } origin-center transition-all duration-300 w-5 h-0.5 bg-gray-500 mt-[5px] `}
            ></span>

            <span
              className={`${
                isSidebarOpen ? "h-0 translate-y-[5px]" : "h-0.5"
              } origin-bottom-left transition-all duration-100 w-5 bg-gray-500 mt-[5px]`}
            ></span>
          </div>
        </button>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          session={session}
          handleLogout={handleLogout}
        />
        {/*      {isMobileMenuOpen && (
          <div className="w-full md:hidden absolute top-11 left-0 border-[#e6defc] border-b-[1px]">
            <ul
              className="bg-white font-medium text-sm flex flex-col p-4 mt-4 ul-mobile-menu text-gray-600"
              style={{ height: isMobileMenuOpen ? "100%" : "0" }}
            >
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              {session ? (
                <>
                  <li>
                    <Link
                      href="/direct-message"
                      className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      Direct Message
                    </Link>
                  </li>
                  {session.user.roles.includes("ADMIN") && (
                    <li>
                      <Link
                        href="/admin"
                        className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                      >
                        Admin Page
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={`/user/edit/${session.user.id}`}
                      className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                    >
                      Atur Profil
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block py-2 px-3 rounded md:bg-transparent md:p-0 cursor-pointer"
                    >
                      Sign out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/auth/register"
                      className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      Daftar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/login"
                      className="block py-2 px-3 rounded md:bg-transparent md:p-0"
                      aria-current="page"
                    >
                      Masuk
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )} */}
        {/* Mobile Menu End */}
        <div className="hidden w-full lg:flex md:w-auto" id="navbar-default">
          <ul className="bg-white font-medium flex items-center p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-gray-600 font-[600] ">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {session ? (
              <>
                <li>
                  <Link
                    href="/direct-message"
                    className="block py-2 px-3 rounded md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Pesan Pribadi
                  </Link>
                </li>
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
              </>
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
