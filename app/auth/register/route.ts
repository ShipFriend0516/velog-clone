import connect from "@/schemas";
import User from "@/schemas/User";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  const { email, password, username } = await req.json();
  try {
    connect();
    const hash = await bcrypt.hash(password, 12);
    const exUser = await User.find(
      {
        email: email,
      },
      { username }
    );

    if (exUser.length > 0) {
      return Response.json(
        { success: false, message: "이미 존재하는 이메일입니다." },
        { status: 409 }
      );
    }
    const user = await User.create({
      username,
      email,
      password: hash,
    });
    return Response.json(
      { success: true, user: user, message: "User created successfully" },
      { status: 201 }
    );
  } catch (e) {
    return Response.json({ success: false, error: "Failed to register user" }, { status: 400 });
  }
}
