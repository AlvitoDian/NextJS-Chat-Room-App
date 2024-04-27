import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const getUserById = async (id) => {
  try {
    const res = await axios.get(`/api/users/detailUser/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch topic");
  }
};

export default function EditUser() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status, update } = useSession();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(id);
        setNewUsername(userData.user.username);
        setNewEmail(userData.user.email);
        setProfileImage(userData.user.profileImage);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.onerror = () => {
        setError("Failed to read the file.");
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please select a file.");
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", newUsername);
    formData.append("email", newEmail);
    formData.append("profileImage", profileImage);

    try {
      setIsLoading(true);
      const response = await axios.put(`/api/users/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsLoading(false);
        const data = response.data;

        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            username: data.user.username,
            email: data.user.email,
            profileImage: data.user.profileImage,
          },
        };
        console.log("ss edited", updatedSession);
        update(updatedSession);
      } else {
        const errorMessage = response.data.message;
        console.log("Update failed", errorMessage);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log("Update failed", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#e1daf7]">
      <div className="max-w-4xl w-full space-y-8 bg-white shadow-lg p-10 rounded-lg ">
        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Edit Profil
          </h2>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          {/* Photo Profile */}
          <div className="flex items-center justify-center">
            <label
              htmlFor="profileImage"
              className="cursor-pointer transition duration-300 ease-in-out relative items-center flex justify-center"
            >
              {previewImage && (
                <img
                  className="w-32 h-32 mb-3 rounded-full shadow-lg opacity-60 hover:opacity-90 transition duration-300 ease-in-out"
                  src={previewImage}
                  alt="Profile preview"
                />
              )}
              {!previewImage && (
                <img
                  className="w-32 h-32 mb-3 rounded-full shadow-lg opacity-60 hover:opacity-90 transition duration-300 ease-in-out"
                  src={profileImage}
                  alt="Profile image"
                />
              )}
              <div className="absolute">
                <FontAwesomeIcon
                  icon={faEdit}
                  size="xl"
                  className="text-white"
                />
              </div>
            </label>
          </div>
          {/* Photo Profile */}

          {/* Form */}
          <div>
            <form
              className="mt-8 space-y-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="file"
                id="profileImage"
                accept=".png, .jpg, .jpeg"
                name="profileImage"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div>
                <label htmlFor="email-address" className="text-sm font-medium">
                  Username
                </label>
                <input
                  id="email-address"
                  name="username"
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-gray-100 rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-gray-100 rounded-md relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              {error && (
                <div className="bg-red-600 border text-white px-4 py-2 rounded-md mt-5">
                  {error}
                </div>
              )}

              <div>
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
                    "Update Profil  "
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* Form */}
        </div>
      </div>
    </div>
  );
}
