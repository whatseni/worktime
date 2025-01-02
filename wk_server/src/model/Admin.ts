import { model, Schema } from "mongoose";

export interface Iadmin extends Document {
  id: string;
  password: string
  company: String;
}

const adminSchema = new Schema<Iadmin>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
})

const Admin = model<Iadmin>("admin", adminSchema);
export default Admin;