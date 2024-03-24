import Link from "next/link";

export default function CardRoom({ name, id }) {
  return (
    <Link href={`/chat-room/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://via.placeholder.com/350x150"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4 flex justify-center">
          <div className="font-bold text-xl mb-2">{name}</div>
        </div>
      </div>
    </Link>
  );
}
