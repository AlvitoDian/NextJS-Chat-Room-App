import Avatar from "@/components/Avatar";

export default function ContactField({ username, message }) {
  return (
    <div className="bg-white hover:bg-gray-100 transition-all duration-200 border-b-[1px] border-[#d7cafc] cursor-pointer">
      <div className="flex p-3">
        {/* Icon */}
        <div className="w-5">
          <div className="w-10 h-10 rounded-full flex justify-center items-center">
            <Avatar image={"https://www.w3schools.com/howto/img_avatar.png"} />
          </div>
        </div>

        {/* Explain */}
        <div className="ml-10 flex flex-col">
          <span className="font-medium text-md text-gray-900">{username}</span>
          <span className="text-sm text-gray-500">{message}</span>
        </div>
      </div>
    </div>
  );
}
