// components/CreatePostForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
            {...register("title", { required: true })}
            id="title"
            placeholder="Post Title"
            className={cn("mt-1", errors.title && "border-red-500")}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div>
          <Label htmlFor="author" className="text-lg font-medium">
            Author
          </Label>
          <Input
            {...register("author", { required: true })}
            id="author"
            placeholder="Author Name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="status" className="text-lg font-medium">
            Status
          </Label>
          <select
            {...register("status", { required: true })}
            id="status"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
          {errors.status && <p className="text-red-500">Status is required</p>}
        </div>

        <div>
          <Label htmlFor="body" className="text-lg font-medium">
            Content
          </Label>
          <Textarea
            {...register("body")}
            id="body"
            placeholder="Write your content here..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="slug" className="text-lg font-medium">
            Slug
          </Label>
          <Input
            {...register("slug", { required: true })}
            id="slug"
            placeholder="post-slug"
            className={cn("mt-1", errors.slug && "border-red-500")}
          />
          {errors.slug && <p className="text-red-500">Slug is required</p>}
        </div>

        <div>
          <Label htmlFor="hero" className="text-lg font-medium">
            Hero Image URL
          </Label>
          <Input
            {...register("hero")}
            id="hero"
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tag" className="text-lg font-medium">
            Tags
          </Label>
          <Input
            {...register("tag")}
            id="tag"
            placeholder="e.g., technology, tutorial"
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Post
        </Button>
      </form>
    </div>
  );
}
