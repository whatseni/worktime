import { InferSchemaType, Schema } from "mongoose";
const mongoose = require("mongoose");

const PlanetSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  orderFromSun: Number,
  hasRings: Boolean,
  mainAtmosphere: Array,
  surfaceTemperatureC: {
    min: Number,
    max: Number,
    mean: Number
  }
});

type PlanetType = InferSchemaType<typeof PlanetSchema>;

export default mongoose.model.Planets || mongoose.model("Planets", PlanetSchema);
export type { PlanetType };