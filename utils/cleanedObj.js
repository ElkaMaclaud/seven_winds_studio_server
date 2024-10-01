const obj = {
    id: 0,
    rowName: "",
    // total: 0,
    salary: 0,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
    child: []
  };

export function cleanedobj(object) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = (!["rowName"].includes(key) ? parseInt(object[key]) : (object[key]).toString()) || obj[key]
        return acc
    }, {}) 

}