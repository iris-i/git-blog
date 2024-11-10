"use client"

import { useEffect, useState } from "react";


interface Post {
  title: string;
  author: string;
  status: "draft" | "publish";
  body: string;
  slug: string;
  hero?: string;
  tag?: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/getPosts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchPosts();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!posts.length) return <p>Loading posts...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">by {post.author}</p>
            <p className="text-gray-800">{post.body.substring(0, 100)}...</p>
            <a href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
