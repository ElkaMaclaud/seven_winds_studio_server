import { cleanedobj } from "./cleanedObj.js";

export function updateValue(rootObject, newObj, action = "update", parentId) {
  const output = { changed: [], current: {} };
  const newObject = cleanedobj(newObj);
  let updatedObject = {};
  let firstAction = false;
  const id = action === "create" ? parentId : newObj.id;
  function recursiveUpdate(node) {
    if (node.id === id) {
      if (action === "create") {
        if (!child in node) {
          //!node.hasOwnProperty(child)
          node.child = [];
        }
        newObject.id = parseInt(Math.random() * 10000 + 10000)
        node.child.push(newObject);
        updatedObject = diffObj({}, newObject);
        node = diffObj(node, newObject, parent);
        output.current = node;
        return true;
      } else if (action === "update") {
        updatedObject = diffObj(node, newObject);
        node = newObject;
        output.current = node;
        return true;
      } else {
        updatedObject = diffObj(node, {});
        firstAction = true;
        output.current = null;
        return true;
      }
    }

    let valueUpdated = false;

    if (node.child && node.child.length > 0) {
      for (let child of node.child) {
        if (recursiveUpdate(child)) {
          valueUpdated = true;
        }
      }
    }
    if (valueUpdated) {
      if (firstAction && action === "delete") {
        const index = node.child.findIndex((item) => (newObject.id = item.id));
        node.splice(index, 1);
        firstAction = false;
      }
      node = diffObj(node, updatedObject);
      output.changed.push(node);
      return valueUpdated;
    }
    return valueUpdated;
  }

  if (!id) {
    newObject.id = parseInt(Math.random() * 10000 + 10000)
    output.current = newObject;
    rootObject = [newObject];
  }
  if (rootObject.child) {
    for (let object of rootObject.child) {
      recursiveUpdate(object);
    }
  }

  return { response: output, changedObj: rootObject };
}

function diffObj(oldObj, newObj, parent = false) {
  let diff = {};

  if (!oldObj) {
    return newObj;
  }
  for (let key in oldObj) {
    if (key !== "rowName" || key !== "id") {
      if (newObj.hasOwnProperty(key)) {
        if (parent) {
          diff[key] = newObj[key] + oldObj[key];
        }
        diff[key] = newObj[key] - oldObj[key];
      } else {
        diff[key] = -newObj[key];
      }
    }
  }
  return diff;
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
