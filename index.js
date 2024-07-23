import { Tree } from "./Tree.js";

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

const numLimit = 100;
const arrSizeLimit = 20;

const getRandomNumber = () => Math.floor(Math.random() * numLimit);

const randomFilledArray = [...Array(arrSizeLimit)].map(() => getRandomNumber());

const tree = new Tree(randomFilledArray);

prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.insert(50);
tree.insert(65);
tree.insert(71);
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.levelOrder(console.log);
tree.preOrder(console.log);
tree.postOrder(console.log);
tree.inOrder(console.log);

tree.insert(150);
tree.insert(700);
tree.insert(512);
tree.insert(6634);

console.log(tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.levelOrder(console.log);
tree.preOrder(console.log);
tree.postOrder(console.log);
tree.inOrder(console.log);
