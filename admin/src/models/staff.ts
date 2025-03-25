import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const StaffSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  company: {
    type: String,
    enum: ["PB", "MEGA"]
  },
  bank: String,
  bankAccount: String,
  birth: String,
  phone: String,
  isWeek: Boolean
});

type StaffType = InferSchemaType<typeof StaffSchema>;

export default mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
export type { StaffType };