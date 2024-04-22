import connect from "../../../schemas";
import Post from "../../../schemas/Post";
import { PostType } from "../../../schemas/Post";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  success: boolean;
  data?: PostType[] | PostType;
  error?: string;
}

interface RequestData {
  title: string;
  content: string;
}

export async function GET(req: Request) {
  try {
    connect();
    const posts = await Post.find({});
    console.log(posts);
    return Response.json({ success: true, data: posts });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Cannot Find Posts" });
  }
}

export async function POST(req: Request) {
  try {
    connect();
    const { title, content } = await req.json();

    const post = await Post.create({
      title,
      content,
    });
    return Response.json({ success: true, data: post });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Invalid Post Request" });
  }
}
