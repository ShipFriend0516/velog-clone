import mongoose, { Document, Schema } from "mongoose";

export interface PostType extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  likes: number;
  series_id: mongoose.Types.ObjectId;
  comments?: string[];
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [{ type: String }],
  likes: { type: Number, default: 0, required: true },
  series_id: { type: Schema.Types.ObjectId, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  thumbnailUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model<PostType>("Post", postSchema);

export default Post;
