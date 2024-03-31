import Link from "next/link";

export default function CardRoom({ name, id }) {
  return (
    <Link href={`/chat-room/${id}`}>
      <div className="max-w-xl w-96 rounded-lg overflow-hidden shadow-lg flex justify-center items-end image-card overlay-gradient">
        {/*  <img
          className="w-full"
          src="https://via.placeholder.com/350x150"
          alt="Sunset in the mountains"
        /> */}
        <div className="px-6 py-4 text-white z-10 flex flex-col items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="">Participans</div>
        </div>
      </div>
    </Link>
  );
}
