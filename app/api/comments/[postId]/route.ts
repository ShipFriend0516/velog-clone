import connect from "@/schemas";
import Comment from "@/schemas/Comment";
import url from "url";

export async function GET(req: Request) {
  try {
    const post_id = url.parse(req.url, true).pathname?.split("/").pop();

    const comments = await Comment.find({ post_id: post_id })
      .populate("commentAuthor", ["_id", "username", "thumbnailUrl", "email"])
      .lean();
    console.log("댓글 목록", comments);

    return Response.json({ success: true, comments: comments });
  } catch (e) {
    console.error(e);

    return Response.json({ success: false, message: "댓글 목록 불러오기 실패" });
  }
}
