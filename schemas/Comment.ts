import mongoose, { Document, Schema } from "mongoose";

export interface CommentType extends Document {
  post_id: mongoose.Types.ObjectId;
  content: string;
  commentAuthor: mongoose.Types.ObjectId;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  commentAuthor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model<CommentType>("Comment", commentSchema);

export default Comment;
