import Image from "next/image";
export default function Avatar({ image }) {
  return (
    <Image
      className="w-8 h-8 rounded-full"
      src={image}
      alt="Rounded avatar"
      width={100}
      height={100}
    />
  );
}
