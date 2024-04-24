import mongoose, { Document, Schema } from "mongoose";

export interface SeriesType extends Document {
  username: string;
  snsId: string;
  email: string;
  password: string;
  profileThumbnailUrl?: string;
  introduction?: string;
}

const seriesSchema: Schema = new Schema({
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
  },
  introduction: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Series = mongoose.models.User || mongoose.model<SeriesType>("User", seriesSchema);

export default Series;
