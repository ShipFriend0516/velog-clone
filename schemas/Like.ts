import mongoose, { Document, Schema } from "mongoose";

export interface LikeType extends Document {
  post_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const likeSchema: Schema = new Schema({
  post_id: { type: Schema.Types.ObjectId, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.models.Like || mongoose.model<LikeType>("Like", likeSchema);

export default Like;
