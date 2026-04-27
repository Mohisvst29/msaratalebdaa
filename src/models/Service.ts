import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
