import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const TimeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  staffId: Schema.Types.ObjectId,
  name: String,
  company:  {
    type: String,
    enum: ["PB", "MEGA"]
  },
  date: String,
  start: String,
  end: String
});

type TimeType = InferSchemaType<typeof TimeSchema>;

export default mongoose.models.Time || mongoose.model("Time", TimeSchema);
export type { TimeType };