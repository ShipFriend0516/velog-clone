import connect from "@/schemas";
import User from "@/schemas/User";
import { request } from "http";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

// 인증 필요, 중요 개인정보 포함
export async function GET() {
  try {
    const header = headers();
    const accessToken = header.get("authorization")?.split(" ")[1];
    if (!accessToken) return Response.json({ status: 401 });

    const verifedUser = await verify(accessToken);

    if (verifedUser) {
      // 인증된 유저
      const userdata = await User.findOne({ _id: verifedUser }, [
        "_id",
        "snsId",
        "username",
        "email",
        "profileThumbnailUrl",
        "introduction",
      ]);

      return Response.json({ userdata: userdata });
    } else {
      return Response.json({}, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ status: 401 });
  }
}

// 인증 미필요, 중요정보 미포함
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const slicedUserId = userId.slice(3);

    const user = await User.findOne(
      {
        email: {
          $regex: slicedUserId,
          $options: "i",
        },
      },
      ["username", "introduction", "profileThumbnailUrl"]
    );
    return Response.json({ userdata: user });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 400 });
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
