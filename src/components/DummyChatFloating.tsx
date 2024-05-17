import Avatar from "./Avatar";

export default function DummyChatFloating({ imgProfile, name, chat, isLeft }) {
  return isLeft ? (
    <div className="p-3 bg-white border border-gray-200 rounded-full shadow bg-white bg-opacity-50 flex items-center gap-[15px] backdrop-blur-[2px]">
      <div className="flex flex-col pl-2">
        <p className="text-sm font-medium text-gray-900 flex justify-end">
          {name}
        </p>
        <p className="text-sm font-normal text-gray-400">{chat}</p>
      </div>

      <div className="pr-2">
        <Avatar image={imgProfile} />
      </div>
    </div>
  ) : (
    <div className="p-3 bg-white border border-gray-200 rounded-full shadow bg-white bg-opacity-50 flex items-center gap-[15px] backdrop-blur-[2px]">
      <div className="pl-2">
        <Avatar image={imgProfile} />
      </div>
      <div className="flex flex-col pr-2">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-sm font-normal text-gray-400">{chat}</p>
      </div>
    </div>
  );
}
