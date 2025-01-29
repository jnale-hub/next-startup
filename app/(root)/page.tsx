import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      title: "Startup 1",
      description: "Description 1",
      views: 10,
      image: "https://unsplash.com/photos/a-computer-generated-image-of-a-curved-surface-O8s_2_pEISg",
      category: "Tech",
      _createdAt: new Date(),
      _id: "1",
      author: { id: "1" , name: "John"},
    },
  ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>
    </>
  );
}
