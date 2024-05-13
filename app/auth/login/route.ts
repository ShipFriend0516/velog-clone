import connect from "@/schemas";
import User from "@/schemas/User";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    connect();
    const user = await User.findOne({ email });
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // 비밀번호 일치하면
      console.log(`POST 200 ${email} 유저의 로그인 성공`);
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
      console.log("발급된 토큰", token);
      return Response.json({
        success: true,
        currentUser: {
          accessToken: token,
          id: user._id,
          username: user.username,
          email: user.email,
          profileThumbnailUrl: user.profileThumbnailUrl,
        },
      });
    } else {
      return Response.json({ success: false, message: "잘못된 비밀번호입니다." }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return Response.json({}, { status: 400 });
  }
}
