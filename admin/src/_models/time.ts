import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const TimeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  staffId: Schema.Types.ObjectId,
  name: String,
  data: Date,
  start: String,
  end: String
});

type TimeType = InferSchemaType<typeof TimeSchema>;

export default mongoose.model.Time || mongoose.model("Time", TimeSchema);
export type { TimeType };