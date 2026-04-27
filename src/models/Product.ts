import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  categoryEn: { type: String },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
