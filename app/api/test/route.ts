export async function GET(req: Request) {
  return Response.json({ message: process.env.DB_USER });
}
