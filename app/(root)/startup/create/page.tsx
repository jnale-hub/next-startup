import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const PageProps = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return ( 
    <>
      <section className="">
        <h1 className="x-6 py-2 font-work-sans font-extrabold sm:text-4xl sm:leading-[64px] text-3xl leading-[46px] text-center my-4">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default PageProps;
