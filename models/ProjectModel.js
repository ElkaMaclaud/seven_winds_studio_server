import { Schema, model } from "mongoose";

const ProjectModel = new Schema({
  id: { type: Number },
  rowName: { type: String },
  total: { type: Number },
  salary: { type: Number },
  mimExploitation: { type: Number },
  machineOperatorSalary: { type: Number },
  materials: { type: Number },
  mainCosts: { type: Number },
  supportCosts: { type: Number },
  equipmentCosts: { type: Number },
  overheads: { type: Number },
  estimatedProfit: { type: Number },
  child: [{type: Schema.Types.ObjectId, ref: "Project"}]
});

export default model("Project", ProjectModel);
