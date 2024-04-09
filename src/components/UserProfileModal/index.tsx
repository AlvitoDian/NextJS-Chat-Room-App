import React from "react";

export default function UserProfileModal() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    phone: "123-456-7890",
    website: "example.com",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96">
        <button
          className="absolute top-2 right-2"
          onClick={() => console.log("Close clicked")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-semibold">User Details</h3>
          <p className="mt-2 text-sm text-gray-500">
            Username: {user.username}
          </p>
          <p className="mt-1 text-sm text-gray-500">Phone: {user.phone}</p>
          <p className="mt-1 text-sm text-gray-500">Website: {user.website}</p>
        </div>
      </div>
    </div>
  );
}
