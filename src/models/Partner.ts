import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);
