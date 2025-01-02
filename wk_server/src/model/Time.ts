import { model, Schema } from "mongoose";

export interface IWorkTime extends Document {
  userName: String;
  userPhone: String;
  workDate: Date;
  startTime: String;
  endTime: String;
  company: String;
}

const timeSchema = new Schema<IWorkTime>({
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  workDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  company: { type: String, required: true },
})

const Time = model<IWorkTime>("times", timeSchema);
export default Time;