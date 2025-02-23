import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Skeleton } from '@/components/ui/skeleton';
import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const md = markdownit();

export const experimental_ppr = true;

const PageProps = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="w-full min-h-24 flex justify-center items-center flex-col py-10 px-6">
        <p className="text-gray-300 text-center text-sm md:text-base">{formatDate(post?._createdAt)}</p>

        <h1 className="px-6 py-2 font-work-sans font-extrabold sm:text-5xl sm:leading-[64px] text-4xl leading-[46px] max-w-5xl text-center my-4 highlight">{post.title}</h1>
        <p className="text-center text-gray-300">{post.description}</p>
      </section>

      <section className="section_container">
        <div className="max-w-4xl mx-auto">
          <img
            src={post.image}
            alt="thumbnail"
            className="aspect-video object-cover rounded-xl"
          />
        </div>

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="font-medium text-lg md:text-xl">{post.author.name}</p>
                <p className="font-medium text-base md:text-md text-gray-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="px-3 py-1 rounded-full bg-gradient-to-r from-green-200/30 to-blue-500/30 text-sm">{post.category}</p>
          </div>

          <h3 className="font-semibold text-2xl text-gray-200">Pitch Details</h3>
        {parsedContent ? (
          <article
            className="prose prose-gray prose-invert max-w-4xl font-work-sans text-pretty0"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="text-gray-300">No details provided</p>
        )} 
        </div>

        <hr className="divider" />
        
      {editorPosts?.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editor Picks</p>

          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post: StartupTypeCard, i: number) => (
              <StartupCard key={i} post={post} />
            ))}
          </ul>
        </div>
      )}
        
      <Suspense fallback={<Skeleton className="h-8 w-24 fixed bottom-3 right-3 rounded-full bg-gradient-to-r from-green-200/40 to-blue-500/40 backdrop-blur-lg" />}>
        <View id={id} />
      </Suspense>
      </section>
    </>
  );
};

export default PageProps;
