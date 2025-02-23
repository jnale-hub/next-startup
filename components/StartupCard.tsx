import { cn, formatDate } from "@/lib/utils";
import { Author, Startup } from "@/sanity/types";
import { LucideEye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
// import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="group text-gray-50 bg-gray-800 rounded-xl overflow-hidden flex flex-col">
      <Link href={`/startup/${_id}`}>
        <img src={image} alt="placeholder" className="aspect-video object-cover" />
      </Link>

      <div className="p-4 flex-1 grid">
        <div className="flex flex-wrap gap-x-4 gap-y-2  items-center">
          <Link href={`/startup/${_id}`}>
            <h3 className="font-medium max-md:text-xl max-sm:text-base 2xl:text-xl line-clamp-1">
              {title}
            </h3>
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-400">by</span>
            <Link
              href={`/user/${author?._id}`}
              className="gap-2 flex items-center line-clamp-1"
            >
              <Image
                src={author?.image!}
                alt={author?.name!}
                width={32}
                height={32}
                className="rounded-full aspect-square object-cover"
              />
              <p className="font-normal max-md:text-base max-sm:text-sm 2xl:text-base  text-gray-300">
                {author?.name}
              </p>
            </Link>
          </div>
        </div>
        <Link href={`/startup/${_id}`}>
          <p className="font-normal text-base line-clamp-2 my-3 text-gray-400">
            {description}
          </p>
        </Link>
        <div className="flex justify-between items-center mt-6 place-items-end">
          <p className="text-sm text-gray-200">{formatDate(_createdAt)}</p>
          <div className="flex gap-4">
            <div className="flex gap-1.5 items-center">
              <LucideEye className="size-4" />
              <span className="text-sm">{views}</span>
            </div>
            <Link href={`/?query=${category?.toLowerCase()}`}>
              <p className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200/30 to-blue-500/30 text-sm">
                {category}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
