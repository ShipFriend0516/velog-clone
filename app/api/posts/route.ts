import connect from "../../../schemas";
import Post from "../../../schemas/Post";
import { PostType } from "../../../schemas/Post";
import { headers } from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/schemas/User";
import Comment from "@/schemas/Comment";
const jwt = require("jsonwebtoken");

export async function GET(req: Request) {
  try {
    await connect();
    const posts = await Post.find({}).populate("author", ["username", "email"]).lean();

    for (const post of posts) {
      const commentCount = await Comment.countDocuments({ post_id: post._id });
      post.comments = commentCount;
    }

    return Response.json({ success: true, posts: posts.reverse() });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Cannot Find Posts" });
  }
}

export async function POST(req: Request) {
  try {
    connect();
    let { title, content, tags, thumbnailUrl } = await req.json();
    const headersList = headers();
    const authorization = headersList.get("authorization");
    if (!authorization) {
      return Response.json({ success: false, error: "Invalid authorization" });
    }
    const accessToken = authorization?.split(" ")[1];
    try {
      const result = jwt.verify(accessToken, process.env.TOKEN_SECRET);
      console.log(result);
      if (result) {
        const user = await User.findOne({ email: result.email }, "_id");
        if (title === "?") title = "tckkct";
        const post = await Post.create({
          title,
          content,
          tags,
          author: user._id,
          thumbnailUrl,
        });
        return Response.json({ success: true, data: post });
      }
    } catch (error) {
      return Response.json({ success: false, message: "로그인을 해주세요." }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Invalid Post Request" });
  }
}
