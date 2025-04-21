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
  workDay: Array,
  startTime: String,
  endTime: String,
  isWeek: Boolean,
  password: String
});

type StaffType = InferSchemaType<typeof StaffSchema>;

export default mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
export type { StaffType };