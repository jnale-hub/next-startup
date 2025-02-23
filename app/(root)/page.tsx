import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="w-full min-h-[530px] flex justify-center items-center flex-col py-10 px-6">
        <h1 className="px-6 py-3 font-work-sans font-extrabold sm:text-5xl sm:leading-[64px] text-4xl leading-[46px] max-w-5xl text-center my-5">
          Share your Project, <br />
          <span className="highlight">Connect with Devs </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl text-center break-words">
        Skip the struggle of starting from scratch—join existing projects, contribute, and grow.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-gray-50 text-lg md:text-2xl">
          {query ? `Search results for "${query}"` : "All Available Projects"}
        </p>

        <ul className="mt-6 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
