import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const AdminSchema = new Schema({
  id: { type: String },
  password: { type: String },
  company: {
    type: String,
    enum: ["PB", "MEGA"]
  },
});

type AdminType = InferSchemaType<typeof AdminSchema>;

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export type { AdminType };