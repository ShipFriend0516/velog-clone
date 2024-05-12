import mongoose, { Document, Schema } from "mongoose";

export interface SeriesType extends Document {
  name: string;
  description: string;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const seriesSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Series = mongoose.models.Series || mongoose.model<SeriesType>("Series", seriesSchema);
// export const Series = mongoose.model<SeriesType>("Series", seriesSchema);

export default Series;
