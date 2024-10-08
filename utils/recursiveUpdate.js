import { cleanedobj } from "./cleanedObj.js";

export function updateValue(rootObject, newObj, action = "update") {
  const output = { current: {}, changed: [] };
  const newObject = action !== "delete" ? cleanedobj(newObj) : null;
  let updatedObject = {};
  let firstAction = false;
  const id =
    action === "create" ? newObj.parentId : action === "delete" ? newObj : newObj.id;
  function recursiveUpdate(node) {
    if (node.id === id) {
      if (action === "create") {
        if (!("child" in node)) {
          //!node.hasOwnProperty("child")
          node.child = [];
        }
        newObject.id = parseInt(Math.random() * 10000 + 10000);
        node.child.push({...newObject, child: []});
        node.total = node.child.length
        updatedObject = diffObj({}, {...newObject, increment: true});
        const newOb = diffObj(node, updatedObject);
        output.current = (({ child, ...rest }) => rest)(newObject);
        if(!isEqual(node, newOb)) {
          Object.assign(node, newOb);
          output.changed.push((({ child, ...rest }) => rest)(node));
        }
        return true;
      } else if (action === "update") {
        updatedObject = diffObj(node, newObject);
        Object.assign(node, newObject);
        output.current = (({ child, ...rest }) => rest)(node);
        return true;
      } else {
        if (rootObject.id === id) {
          rootObject = null;
          return true
        } else {
          updatedObject = diffObj({}, node);
          firstAction = true;
          node = null;
          output.current = null;
          return true;
        }
      }
    }

    let valueUpdated = false;

    if (node.child && node.child.length > 0) {
      for (let child of node.child) {
        if (recursiveUpdate(child)) {
          valueUpdated = true;
        }
        if (valueUpdated) {
          if (firstAction && action === "delete") {
            const index = node.child.findIndex((item) => item === null);
            node.child.splice(index, 1);
            node.total = node.child.length
            firstAction = false;
          }
          const newOb = diffObj(node, updatedObject);
          if (!isEqual(node, newOb)) {
            Object.assign(node, newOb);
            output.changed.push((({ child, ...rest }) => rest)(node));
          }
          return valueUpdated;
        }
      }
    }
    
    return valueUpdated;
  }

  if (!id && action === "create") {
    newObject.id = parseInt(Math.random() * 10000 + 10000);
    output.current = newObject;
    rootObject = newObject;
  } else {
    recursiveUpdate(rootObject);
  }

  
  recursivesorting(rootObject)

  // function logNode(object) {
  //   for(const child of object.child) {
  //     const { child: _, ...rest } = child; 
  //       console.log(rest); 
  //     if(child.child && child.child.length) {
  //       logNode(child)
  //     }
  //   }
  // }
  // logNode(rootObject)
  return { response: output, changedObj: rootObject };
}

function diffObj(oldObj, newObj) {
  let diff = {};
  let increment = false;

  if (Object.keys(oldObj).length === 0) {
    return newObj;
  }
  if (newObj.hasOwnProperty("increment")) {
    increment = true;
  }
  for (let key in oldObj) {
    if (!["rowName", "id", "child", "total"].includes(key)) {
      if (newObj.hasOwnProperty(key)) {
        if (increment) {
          diff[key] = newObj[key] + oldObj[key];
        } else {
          diff[key] = oldObj[key] - newObj[key];
        }
      }
    }
  }
  return diff;
}

function isEqual(node, newOb) {
  const rest = (({ child, rowName, id, total, ...rest }) => rest)(node);
  const result = Object.entries(rest).every(
    ([key, val]) => newOb[key] === val
  );
  return result
}
function recursivesorting(obj) {
  if(!obj) {
    return null
  }
  if (obj.child && obj.child > 1) {
    obj.child.sort(a, (b) => {
      const lengthDifference =
        (a.child ? a.child.length : 0) - (b.child ? b.child.length : 0);
      return lengthDifference;
    });
    obj.child.forEach((childObj) => {
      recursivesorting(childObj);
    });
  }
}

// class Node {
//     constructor(name, parent = null) {
//         this.name = name;
//         this.parent = parent;
//         this.children = [];
//     }

//     addChild(child) {
//         child.parent = this;
//         this.children.push(child);
//     }

//     update() {

//         console.log(`Обновление объекта: ${this.name}`);
//     }

//     getParent() {
//         return this.parent;
//     }
// }

// function updateParents(node) {

//     let current = node.getParent();
//     while (current !== null) {
//         current.update();
//         current = current.getParent();
//     }
// }

// const root = new Node("Root");
// const child1 = new Node("Child1");
// const child2 = new Node("Child2");
// const child3 = new Node("Child3");

// root.addChild(child1);
// root.addChild(child2);
// child1.addChild(child3);

// console.log("Обновляем Child1 и его родителей:");
// child1.update();
// updateParents(child1);

// console.log(`Дети ${child1.name}: ${child1.children.map(child => child.name).join(', ')}`);
