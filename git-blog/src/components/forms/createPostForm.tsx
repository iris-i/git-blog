// components/CreatePostForm.tsx
"use client";

import { useForm } from "react-hook-form";

interface PostData {
  title: string;
  author: string;
  status: "draft" | "publish";
  body: string;
  slug: string;
  hero?: string;
  tag?: string;
}

export default function CreatePostForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PostData>({
    defaultValues: { status: "draft" },
  });

  const onSubmit = async (data: PostData) => {
    const response = await fetch("/api/createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Post created successfully!");
      reset();
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: true })} placeholder="Title" />
      {errors.title && <span>Title is required</span>}

      <input {...register("author", { required: true })} placeholder="Author" />
      {errors.author && <span>Author is required</span>}

      <select {...register("status", { required: true })}>
        <option value="draft">Draft</option>
        <option value="publish">Publish</option>
      </select>
      {errors.status && <span>Status is required</span>}

      <textarea {...register("body")} placeholder="Content" />

      <input {...register("slug", { required: true })} placeholder="Slug" />
      {errors.slug && <span>Slug is required</span>}

      <input {...register("hero")} placeholder="Hero Image URL" />
      <input {...register("tag")} placeholder="Tag" />

      <button type="submit">Save Post</button>
    </form>
  );
}
