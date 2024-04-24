import connect from "@/schemas";
import Post from "@/schemas/Post";
import User from "@/schemas/User";
import * as url from "url";

export async function GET(req: Request) {
  const queryObject = url.parse(req.url, true).query;
  console.log();
  const email = url.parse(req.url, true).pathname?.split("/").pop();
  const user = await User.findOne({ email: { $regex: email?.slice(3) } }, "_id");
  const posts = await Post.find({ author: user._id });

  return Response.json({ posts: posts });
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const post = await Post.findOne({ title: decodeURIComponent(title) })
    .populate("author", "username")
    .lean();
  if (post) {
    return Response.json({ success: "true", post: post });
  } else {
    return Response.json({ success: "false" }, { status: 404 });
  }
}
