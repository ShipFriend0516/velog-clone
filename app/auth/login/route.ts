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
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
      });
      console.log("발급된 토큰", token);
      return Response.json({ success: true, message: "유저 로그인 성공", accessToken: token });
    } else {
      return Response.json({ success: false, message: " 잘못된 비밀번호입니다." }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
  }
}
