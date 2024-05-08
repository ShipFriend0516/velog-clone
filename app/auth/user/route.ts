import connect from "@/schemas";
import User from "@/schemas/User";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

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
