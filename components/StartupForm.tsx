"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="space-y-6 max-w-4xl mx-auto p-4">
  <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-300">
      Title
    </label>
    <Input
      id="title"
      name="title"
      className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
      placeholder="Startup Title"
    />
    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
  </div>

  <div>
    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
      Description
    </label>
    <Textarea
      id="description"
      name="description"
      className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
      placeholder="Startup Description"
    />
    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
  </div>

  <div>
    <label htmlFor="category" className="block text-sm font-medium text-gray-300">
      Category
    </label>
    <Input
      id="category"
      name="category"
      className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
      placeholder="Startup Category (Tech, Health, Education...)"
    />
    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
  </div>

  <div>
    <label htmlFor="link" className="block text-sm font-medium text-gray-300">
      Image URL
    </label>
    <Input
      id="link"
      name="link"
      className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
      required
      placeholder="Startup Image URL"
    />
    {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
  </div>

  <div>
    <label htmlFor="pitch" className="block text-sm font-medium text-gray-300">
      Pitch
    </label>
    <MDEditor
      value={pitch}
      onChange={(value) => setPitch(value as string)}
      id="pitch"
      preview="edit"
      height={300}
      className="mt-2 border border-gray-700 rounded-md overflow-hidden bg-gray-800 text-white"
      textareaProps={{
        placeholder: "Briefly describe your idea and what problem it solves",
      }}
      previewOptions={{
        disallowedElements: ["style"],
      }}
    />
    {errors.pitch && <p className="mt-1 text-sm text-red-500">{errors.pitch}</p>}
  </div>

  <Button
    type="submit"
    className="py-2 px-4"
    disabled={isPending}
  >
    {isPending ? "Submitting..." : "Submit Your Pitch"}
    <Send className="size-6 ml-2" />
  </Button>
</form>
  );
};

export default StartupForm;
