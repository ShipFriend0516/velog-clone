import mongoose, { Document, Schema } from "mongoose";

export interface UserType extends Document {
  username: string;
  snsId: string;
  email: string;
  password: string;
  profileThumbnailUrl: string;
  introduction?: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  snsId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileThumbnailUrl: {
    type: String,
    default: "",
  },
  introduction: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<UserType>("User", userSchema);

export default User;
