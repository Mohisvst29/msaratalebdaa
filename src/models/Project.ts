import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
  categoryEn: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  description: { type: String },
  descriptionEn: { type: String },
  image: { type: String, required: true },
  category: { type: String },
  categoryEn: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
