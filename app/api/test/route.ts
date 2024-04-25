import connect from "@/schemas";

const bcrypt = require("bcrypt");

export async function GET(req: Request) {
  const hash = await bcrypt.hash("hello this is my new project", 256);
  try {
    connect();
  } catch (err) {
    console.error(err);
  }
  return Response.json({ message: process.env.DB_USER, hash: hash });
}
