import Avatar from "./Avatar";

export default function DummyChatFloating({ imgProfile, name, chat, isLeft }) {
  return isLeft ? (
    <div
      className="p-3 bg-white border border-white border-[1px] rounded-full bg-white bg-opacity-50 flex items-center gap-[15px] backdrop-blur-[8px]"
      style={{
        /*  filter: "drop-shadow(5px 5px 54px rgba(0, 0, 0, 0.4))", */
        boxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
      }}
    >
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
    <div
      className="p-3 bg-white border border-white border-[1px] rounded-full bg-white bg-opacity-50 flex items-center gap-[15px] backdrop-blur-[8px]"
      style={{
        boxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "10px 10px 99px 0px rgba(0,0,0,0.15)",
      }}
    >
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
