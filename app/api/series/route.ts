import { verify } from "@/app/function/api/verify";
import connect from "@/schemas";
import Series from "@/schemas/Series";

import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

// POST /api/series - 시리즈 생성
export async function POST(req: Request) {
  try {
    const { name, description, userId } = await req.json();
    connect();
    const series = await Series.create({
      name: name,
      description: description,
      user_id: userId,
    });

    return Response.json({ series: series });
  } catch (err) {
    console.error(err);
    return Response.json({}, { status: 400 });
  }
}

// GET /api/series - 시리즈 불러오기
export async function GET(req: Request) {
  try {
    const header = headers();
    const authorization = header.get("authorization");
    const accessToken = authorization?.split(" ")[1];
    const verfiedUser = await verify(accessToken!);

    connect();
    const series = await Series.find({ user_id: verfiedUser });
    return Response.json({ series: series });
  } catch (err) {
    console.error(err);
    return Response.json({}, { status: 401 });
  }
}
