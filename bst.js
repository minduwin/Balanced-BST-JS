// Function to print out the balanced BST to terminal
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    constructor (data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
};

class Tree {
    constructor (newArray) {
        this.newArray = [...removeDuplicates(mergeSort(newArray))];
        this.root = this.buildTree(newArray, 0, newArray.length - 1);
        this.preOrderData = [];
        this.inOrderData = [];
        this.postOrderData = [];
        prettyPrint(this.root);
    }

    buildTree(newArray, start, end) {
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let root = new Node(newArray[mid]);

        root.left = this.buildTree(newArray, start, mid - 1);
        root.right = this.buildTree(newArray, mid + 1, end);
        return root;
    }

    insert(value, root = this.root) {
        if (root == null) {
            return (root = new Node(value));
        }

        if (root.data < value) {
            root.right = this.insert(value, root.right);
        } else {
            root.left = this.insert(value, root.left);
        }
        prettyPrint(this.root);
        return root;
    }

    delete(value, root = this.root) {
        if (root == null) {
            return root;
        }

        if (root.data > value) {
            root.left = this.delete(value, root.left);
        } else if (root.data < value) {
            root.right = this.delete(value, root.right);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            root.data = minValue(root);
            root.right = this.delete(root.right, root.data);
        }
        prettyPrint(this.root);
        return root;
    }

    find(value, root = this.root) {
        if (root == null) {
            return false;
        }

        if (root.data == value) {
            return root;
        }

        if (root.data > value) {
            return this.find(value, root.left);
        } else if (root.data < value) {
            return this.find(value, root.right);
        }
        prettyPrint(this.root);
        return root;
    }

    levelOrder(root = this.root) {
        const queue = [];
        const result = [];

        if (root == null) {
            return;
        }

        queue.push(root);

        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
            console.log('Level order: ', result);
            return result;
        }
    }

    inOrder(root = this.root) {
        if (root == null) {
            return;
        }

        if (root.left !== null) {
            this.inOrder(root.left);
        }

        if (root.data !== undefined) {
            this.inOrderData.push(root.data);
        }

        if (root.right !== null) {
            this.inOrder(root.right);
        }

        console.log(`Print inOrder... ${this.inOrderData}`);
    }

    preOrder(root = this.root) {
        if (root == null) {
            return;
        }

        if (root.data !== undefined) {
            this.preOrderData.push(root.data);
        }

        if(root.left !== null) {
            this.preOrder(root.left);
        }

        if (root.right !== null) {
            this.preOrder(root.right);
        }
        console.log(`Print Pre Order... ${this.preOrderData}`);
    }

    postOrder(root = this.root) {
        if (root == null) {
            return;
        }

        if (root.left !== null) {
            this.postOrder(root.left);
        }

        if (root.right !== null) {
            this.postOrder(root.right);
        }

        if (root.data !== undefined) {
            this.postOrderData.push(root.data);
        }
        console.log(`Print Post Order... ${this.postOrderData}`);
    }

    height(root = this.root) {
        if (root == null) {
            return -1;
        } else {
            let left = this.height(root.left);
            let right = this.height(root.right);

            return Math.max(left, right) + 1;
        }
    }

    depth(nodeVal, root = this.root, edgeCount = 0) {
        if (root === null) {
            return;
        }

        if (root.data === nodeVal) {
            return edgeCount;
        }

        if (root.data < nodeVal) {
            return this.depth(nodeVal, root.right, (edgeCount + 1));
        } else {
            return this.depth(nodeVal, root.left, (edgeCount + 1));
        }
    }

    isBalanced(root = this.root) {
        if (root == null) {
            return false;
        }

        let leftHalf = root.left;
        let rightHalf = root.right;

        if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
            return false;
        } else {
            return true;
        }
    }

    rebalance() {
        prettyPrint(this.root);
        if (this.isBalanced(this.root)) {
            return this.root;
        }

        let rebalancedTree = [];
        rebalancedTree = this.traverse(this.root, rebalancedTree);

        let balancedTree = new Tree(rebalancedTree);
        prettyPrint(balancedTree.root);
        console.log(`Is the new tree balanced? ${balancedTree.isBalanced()}`);
        return balancedTree.root;
    }

    traverse(root, array) {
        if (array !== undefined) {
            array.push(root.data);
        }

        if (root.left !== null) {
            this.traverse(root.left, array);
        }

        if (root.right !== null) {
            this.traverse(root.right, array);
        }
        return array;
    }

};

function minValue(root) {
    let min = root.data;
    while (root != null) {
        min = root.data;
        root = root.left;
    }
    prettyPrint(this.root);
    return min;
}

function mergeSort(newArray) {
    if (newArray.length == 1) {
        return newArray;
    }

    const dataArray = [];

    const left = mergeSort(newArray.slice(0, newArray.length / 2));
    const right = mergeSort(newArray.slice(newArray.length / 2));

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            dataArray.push(left.shift());
        } else {
            dataArray.push(right.shift());
        }
    }

    return [...dataArray, ...left, ...right];
};

function removeDuplicates(newArray) {
    return [... new Set(newArray)];
} ;

let test = [3, 7, 16, 29, 44, 53, 82];

balanced = new Tree(test, 3, 82);
console.log(balanced.find(3));

balanced.levelOrder();
balanced.inOrder();
