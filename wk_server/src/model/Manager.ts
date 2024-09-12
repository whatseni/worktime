import { model, Schema } from "mongoose";

export interface IManager extends Document {
  id: string;
  password: string
  company: String;
}

const managerSchema = new Schema<IManager>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
})

const Manager = model<IManager>("manager", managerSchema);
export default Manager;