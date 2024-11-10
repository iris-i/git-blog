// app/api/getPosts/route.ts
import { NextResponse } from "next/server";
import octokit from "@/lib/octokit"; // Ensure you have Octokit configured properly

export async function GET() {
  try {
    // Destructure `data` to get the files directly
    const { data: files } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: "iris-i",
      repo: "git-blog",
      path: "data/content/posts", // Path to the posts folder in your repository
    });

    console.log("FILES", files);

    // Retrieve and parse each post's content
    const posts = await Promise.all(
      files.map(async (file: any) => {
        const { data: fileData } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
          owner: "iris-i",
          repo: "git-blog",
          path: file.path,
        });

        // Decode and parse the content from Base64 to JSON
        const content = JSON.parse(Buffer.from(fileData.content, "base64").toString("utf-8"));

        return {
          ...content,
          slug: file.name.replace(".json", ""), // Remove the .json extension for the slug
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
