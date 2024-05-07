import connect from "@/schemas";
import Comment from "@/schemas/Comment";
import User from "@/schemas/User";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

export async function POST(req: Request) {
  try {
    await connect();
    const { post_id, content } = await req.json();

    const headersList = headers();
    const authorization = headersList.get("authorization");
    if (!authorization) return Response.json({ success: false }, { status: 401 });
    const accessToken = authorization?.split(" ")[1];

    const verifiedUser = await verify(accessToken);

    if (verifiedUser) {
      // 댓글 작성
      console.log("댓글작성");
      const comment = await Comment.create({
        post_id,
        commentAuthor: verifiedUser,
        content,
      });
      return Response.json({ success: true, comment: comment });
    } else {
      return Response.json({ success: false }, { status: 401 });
    }
  } catch (err) {
    return Response.json({ success: false }, { status: 400 });
  }
}

const verify = async (token: string) => {
  try {
    const result = jwt.verify(token, process.env.TOKEN_SECRET);
    if (result) {
      const user = await User.findOne({ email: result.email }, "_id");
      if (user) {
        return user;
      } else return false;
    }
  } catch (err) {
    return false;
  }
};
