import Link from "next/link";
import Avatar from "@/components/Avatar";
import Image from "next/image";

export default function CardRoom({ name, id, imgProfile, imgBanner }) {
  const totalImages: number = imgProfile.length;
  const displayedImages: string[] = imgProfile.slice(0, 3);
  const remainingCount: number = totalImages - 3;

  const imagePlaceHold: any = `https://placehold.co/250x250.png?text=${encodeURIComponent(
    remainingCount + "+"
  )}`;

  return (
    <Link href={`/chat-room/${id}`}>
      <div
        className="max-w-xl w-96 rounded-lg overflow-hidden shadow-lg flex justify-center items-end image-card overlay-gradient"
        style={{ backgroundImage: `url(${imgBanner})` }}
      >
        <div className="px-6 py-4 text-white z-10 flex flex-col items-center">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="flex">
            {displayedImages.map((image, index) => (
              <div className="-ml-3" key={index}>
                <Avatar image={image} />
              </div>
            ))}
            {remainingCount > 0 && (
              <Image
                className="w-8 h-8 rounded-full -ml-3 shadow-lg"
                src={imagePlaceHold}
                alt={`Rounded avatar ${totalImages}`}
                width={250}
                height={250}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
