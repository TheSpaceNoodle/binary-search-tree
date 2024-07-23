class Tree {
  constructor(arr) {
    this.root = buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  insert(value) {
    const failCase = (node) => node.data === value;
    const successCase = (node) => !node;

    const node = findNode({ node: this.root, value, failCase, successCase });

    if (!node) {
      console.log("Node already exists");
      return;
    }

    if (node.data > value) {
      node.left = new Node(value);
      return;
    }

    if (node.data < value) {
      node.right = new Node(value);
      return;
    }
  }

  deleteItem(value) {
    const failCase = (node) => node === null;
    const successCase = (node) => node.data === value;

    const node = findNode({ node: this.root, value, failCase, successCase });

    if (!node) {
      console.log("Node not found");
    }

    if (node.left.data === value) {
      node.left = null;
      return;
    }

    if (node.right.data === value) {
      node.right = null;
      return;
    }
  }

  find(value) {
    const failCase = (node) => !node;
    const successCase = (node) => node && node.data === value;

    const node = findNode({ node: this.root, value, failCase, successCase });

    if (!node) {
      console.log("Node not found");
      return null;
    }

    if (node.data > value) {
      return node.left;
    }

    if (node.data < value) {
      return node.right;
    }
  }

  levelOrder(callback) {
    levelorderTraversal(callback, [this.root]);
  }

  inOrder(callback) {
    inOrderTraversal(callback, this.root);
  }

  preOrder(callback) {
    preOrderTraversal(callback, this.root);
  }

  postOrder(callback) {
    postOrderTraversal(callback, this.root);
  }

  height(node) {
    const foundNode = this.find(node.data);

    return Math.max(...calculateHeight(foundNode));
  }

  depth(node) {
    return calculateDepth(this.root, node.data);
  }

  isBalanced() {
    const heightsArr = calculateHeight(this.root);

    return Math.max(...heightsArr) - Math.min(...heightsArr) <= 1;
  }

  rebalance() {
    const arr = [];
    this.inOrder((node) => arr.push(node.data));

    this.root = buildTree(arr.sort((a, b) => a - b));
  }
}

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const buildTree = (arr = []) => {
  if (!arr.length) {
    return null;
  }

  const middleElement = Math.floor((arr.length - 1) / 2);
  const node = new Node(arr[middleElement]);

  node.left = buildTree(arr.slice(0, middleElement));
  node.right = buildTree(arr.slice(middleElement + 1));

  return node;
};

const findNode = ({ node, value, failCase, successCase }) => {
  let foundNode = null;

  if (failCase(node)) {
    return false;
  }

  if (node.data > value) {
    if (successCase(node.left)) {
      return node;
    }

    foundNode = findNode({ node: node.left, value, failCase, successCase });
  }

  if (node.data < value) {
    if (successCase(node.right)) {
      return node;
    }

    foundNode = findNode({ node: node.right, value, failCase, successCase });
  }

  return foundNode;
};

const levelorderTraversal = (callback, queue = []) => {
  if (!callback) {
    throw new Error("Callback is required");
  }

  if (!queue.length) {
    console.log("Tree has been traversed");
    return;
  }

  const currentQueue = [];

  queue.forEach((node) => {
    callback(node);
    if (node.left) currentQueue.push(node.left);
    if (node.right) currentQueue.push(node.right);
  });

  levelorderTraversal(callback, currentQueue);
};

const inOrderTraversal = (callback, node) => {
  if (node.left) {
    inOrderTraversal(callback, node.left);
  }

  callback(node);

  if (node.right) {
    inOrderTraversal(callback, node.right);
  }

  return;
};

const preOrderTraversal = (callback, node) => {
  callback(node);

  if (node.left) {
    preOrderTraversal(callback, node.left);
  }

  if (node.right) {
    preOrderTraversal(callback, node.right);
  }

  return;
};

const postOrderTraversal = (callback, node) => {
  if (node.left) {
    postOrderTraversal(callback, node.left);
  }

  if (node.right) {
    postOrderTraversal(callback, node.right);
  }

  callback(node);

  return;
};

const calculateHeight = (node, height = 0, heightArr = []) => {
  let currentHeight = height;
  let currentHeightArr = heightArr;

  if (!node || (!node.left && !node.right)) {
    heightArr.push(currentHeight);
    return heightArr;
  }

  currentHeight += 1;

  if (node.left) {
    currentHeightArr = calculateHeight(node.left, currentHeight, heightArr);
  }

  if (node.right) {
    currentHeightArr = calculateHeight(node.right, currentHeight, heightArr);
  }

  return currentHeightArr;
};

const calculateDepth = (node, value, depth = 0) => {
  let currentDepth = depth;

  if (!node) {
    console.log("Node not found");
    return;
  }

  if (node.data === value) {
    return currentDepth;
  }

  if (!node.left && !node.right) {
    return;
  }

  currentDepth += 1;

  if (node.data > value) {
    currentDepth = calculateDepth(node.left, value, currentDepth);
  }

  if (node.data < value) {
    currentDepth = calculateDepth(node.right, value, currentDepth);
  }

  return currentDepth;
};

export { Tree, Node };
