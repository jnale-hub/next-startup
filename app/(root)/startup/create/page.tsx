import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const PageProps = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return ( 
    <>
      <section className="pink_xcontainer !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export default PageProps;
