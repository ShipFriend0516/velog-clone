import connect from "@/schemas";
import Like from "@/schemas/Like";
import Post from "@/schemas/Post";

// GET /api/posts/:userId/likes
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    connect();
    const userId = params.userId;
    const likes = await Like.find({
      user_id: userId,
    })
      .populate("post_id", "", Post)
      .lean();

    const likedPosts = likes.map((like) => like.post_id);

    return Response.json({ likedPosts: likedPosts });
  } catch (err) {
    console.error(err);
  }
}
