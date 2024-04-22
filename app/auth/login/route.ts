import connect from "@/schemas";
import User from "@/schemas/User";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    connect();
    const pw = User.findOne({ email }, { password });
    const result = await bcrypt.compare(password, pw.toString());
    if (result) {
      // 비밀번호 일치하면
      console.log(`${email} 유저의 로그인 성공`);
      return Response.json({ success: true, message: "유저 로그인 성공" });
    } else {
      return Response.json({ success: false, message: " 잘못된 비밀번호입니다." }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
  }
}
