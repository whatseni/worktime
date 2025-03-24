import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const AdminSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: String,
  password: String,
});

type AdminType = InferSchemaType<typeof AdminSchema>;

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export type { AdminType };
