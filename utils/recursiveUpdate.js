export function updateSalary(objects, idToUpdate, newSalary) {
    function recursiveUpdate(node) {
        if (node.id === idToUpdate) {
            const oldSalary = node.salary;
            node.salary = newSalary; 
            
            return oldSalary !== newSalary; 
        }

        let salaryUpdated = false; 

        if (node.child && node.child.length > 0) {
            for (let child of node.child) {
                if (recursiveUpdate(child)) {
                    salaryUpdated = true; 
                }
            }
        }
        if (salaryUpdated) {
            node.salary = newSalary; 
        }

        return salaryUpdated;
    }

    for (let object of objects) {
        recursiveUpdate(object); 
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