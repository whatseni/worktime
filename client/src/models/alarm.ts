import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const AlarmSchema = new Schema({
  name: Schema.Types.ObjectId,
  state: Boolean
});

type StaffType = InferSchemaType<typeof AlarmSchema>;

export default mongoose.models.Alarm || mongoose.model("Alarm", AlarmSchema);
export type { StaffType };