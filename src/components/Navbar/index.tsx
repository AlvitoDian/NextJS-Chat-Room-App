import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar({ session }) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center sticky top-0 z-10">
      {/* Logo */}
      <div>
        <Link href="/" className="text-xl font-bold">
          Nimbrunk
        </Link>
      </div>
      {/* Menu */}
      <div>
        <ul className="flex space-x-4">
          {session ? (
            <>
              <li>
                <p className="hover:text-gray-300">{session.user.username}</p>
              </li>
              {session.user.roles.includes("ADMIN") && (
                <li>
                  <Link href="/admin" className="hover:text-gray-300">
                    Admin Page
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Tentang Kami
                </a>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-gray-300">
                  Daftar
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-gray-300">
                  Masuk
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
