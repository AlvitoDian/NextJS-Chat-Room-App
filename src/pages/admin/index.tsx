import Head from "next/head";
import CardRoom from "@/components/CardRoom";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Admin() {
  const [bannerImage, setBannerImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const [field, setField] = useState({
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //? Image Handler
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setBannerImage(file);
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /*   const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!field.name) {
      setError("Must provide all the credentials");
    }
    try {
      setIsLoading(true);
      const response = await axios.post("/api/chatRoom/addRoom", field, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsLoading(false);

        setField({
          name: "",
        });
        console.log(response);

        setRooms((prevState) => [...prevState, response.data.savedRoom]);

        console.log(field);
      } else {
        const errorMessage = response.data.message;
        console.log("Signup failed", errorMessage);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log("Signup failed", error.message);
    }
  }; */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!field.name) {
      setError("Must provide all the credentials");
    }

    const formData = new FormData();
    formData.append("name", field.name);
    formData.append("bannerImage", bannerImage);

    try {
      setIsLoading(true);

      const response = await axios.post(`/api/chatRoom/addRoom`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setIsLoading(false);

        setField({
          name: "",
        });
        setPreviewImage("");
        setBannerImage("");
        console.log(response);

        setRooms((prevState) => [...prevState, response.data.savedRoom]);

        console.log(field);
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

  useEffect(() => {
    axios
      .get("/api/chatRoom/getAllRoom")
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setRooms(data.rooms);
        } else {
          console.error("Error fetching rooms:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <div className="px-10 py-10">
        <div className="max-w-md mx-auto my-10 bg-white rounded-lg overflow-hidden shadow-md">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Tambah Chat Room
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Nama:
                </label>
                <input
                  type="text"
                  id="nama"
                  name="name"
                  value={field.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Banner:
                </label>
                {previewImage && (
                  <img
                    className="w-32  mb-3 shadow-lg "
                    src={previewImage}
                    alt="Profile preview"
                  />
                )}
                {/*   {!previewImage && (
                  <img
                    className="w-32 mb-3 shadow-lg opacity-60 hover:opacity-90 transition duration-300 ease-in-out"
                    src={bannerImage}
                    alt="Profile image"
                  />
                )} */}
                <input
                  type="file"
                  id="file"
                  name="bannerImage"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {error && (
                <div className="bg-red-600 border text-white px-4 py-2 rounded-md mt-5">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    "Tambah"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex gap-[12px] justify-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            rooms.map((room, index) => (
              <CardRoom
                key={index}
                name={room.name}
                id={room._id}
                imgBanner={"/bannerchat.png"}
                participants={room.participants}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
