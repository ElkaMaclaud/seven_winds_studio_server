import { Schema, model } from "mongoose"

const ProjectModel = new Schema({
    equipmentCosts: {type: Number},
  estimatedProfit: {type: Number},
  machineOperatorSalary: {type: Number},
  mainCosts: {type: Number},
  materials: {type: Number},
  mimExploitation: {type: Number},
  overheads: {type: Number},
  parentId: {type: Number | null},
  rowName: {type: String},
  salary: {type: Number},
  supportCosts: {type: Number},
  id: {type: Number},
  child: {type: OutlayRowRequest[]},
})

exports model("Project", ProjectModel)