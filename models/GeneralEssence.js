import { Schema, model } from "mongoose";

const GeneralEssenceModel = new Schema({
  id: { type: Number, required: true },
  rowName: { type: String, required: true },
  child: { type: Object, ref: "Project" }, 
});

export default model("GeneralEssence", GeneralEssenceModel);

