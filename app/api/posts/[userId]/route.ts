import connect from "@/schemas";
import Post from "@/schemas/Post";
import User from "@/schemas/User";
import { headers } from "next/headers";
import * as url from "url";
const jwt = require("jsonwebtoken");

export async function GET(req: Request) {
  const email = url.parse(req.url, true).pathname?.split("/").pop();
  const user = await User.findOne({ email: { $regex: email?.slice(3) } }, "_id");
  const posts = await Post.find({ author: user._id });

  return Response.json({ posts: posts });
}

export async function POST(req: Request) {
  const { title } = await req.json();
  let undashedTitle = title.split("-").join(" ");
  const post = await Post.findOne({ title: decodeURIComponent(undashedTitle) })
    .populate("author", "username")
    .lean();
  if (post) {
    return Response.json({ success: "true", post: post });
  } else {
    return Response.json({ success: "false" }, { status: 404 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const header = headers();
    const authorization = header.get("authorization");

    if (!authorization) {
      return Response.json({ success: false }, { status: 401 });
    }
    const accessToken = authorization?.split(" ")[1];
    try {
      connect();
      const result = jwt.verify(accessToken, process.env.TOKEN_SECRET);
      if (result) {
        console.log("인증성공");
        const user = await User.findOne({ email: result.email }, "_id");
        if (user) {
          const title = searchParams.get("title")!.split("-").join(" ");
          const deleteResult = await Post.deleteOne({ title: title, author: user._id });
          console.log(deleteResult);
          if (deleteResult.deletedCount > 0) {
            console.log("삭제성공");
            return Response.json({ success: true });
          } else {
            return Response.json({ success: false }, { status: 400 });
          }
        }
      }
    } catch (e) {
      return Response.json({ success: false, message: "로그인을 해주세요." }, { status: 401 });
    }
  } catch (err) {
    return Response.json({ success: false }, { status: 400 });
  }
}
