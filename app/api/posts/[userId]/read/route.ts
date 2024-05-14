import connect from "@/schemas";
import Like from "@/schemas/Like";
import Post from "@/schemas/Post";
import User from "@/schemas/User";

// GET /api/posts/:userId/read - 최근 읽은 글 불러오기
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    connect();
    const userId = params.userId;
    const likes = await Like.find({ user_id: userId })
      .populate({
        path: "post_id",
        populate: [
          {
            path: "author",
            model: "User",
            select: "username",
          },
        ],
        model: "Post",
      })
      .lean();

    const likedPosts = likes.map((like) => like.post_id);

    for (const post of likedPosts) {
      post.likes = await Like.countDocuments({ post_id: post._id });
    }

    return Response.json({ likedPosts: likedPosts });
  } catch (err) {
    console.error(err);
    return Response.json({}, { status: 400 });
  }
}
