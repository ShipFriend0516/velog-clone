import connect from "@/schemas";
import Like from "@/schemas/Like";

// POST | 좋아요 눌렀을 때
export async function POST(req: Request) {
  try {
    connect();
    const { post_id, user_id } = await req.json();

    const isLike = await Like.exists({ post_id, user_id });
    const likesCount = await Like.countDocuments({ post_id });

    if (isLike) {
      const result = await Like.deleteOne({ post_id, user_id });
      if (result.deletedCount > 0) {
        return Response.json({ isLike: false, likesCount: likesCount - 1 });
      }
    } else {
      const result = await Like.create({ post_id, user_id });
      if (result) {
        return Response.json({ isLike: true, likesCount: likesCount + 1 });
      }
    }
  } catch (err) {
    console.error(err);
    return Response.json({ message: "좋아요 과정 중 문제발생" }, { status: 400 });
  }
}
