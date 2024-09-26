import { Schema, model } from "mongoose";

const GeneralEssenceModel = new Schema({
  id: { type: Number, required: true },
  rowName: { type: String, required: true },
  child: [{ type: Schema.Types.ObjectId, ref: "Project" }], // Corrected this line
});

export default model("GeneralEssence", GeneralEssenceModel);

