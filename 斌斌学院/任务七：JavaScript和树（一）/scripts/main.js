/**
 * Created by ZZQ on 2017/3/18.
 */
(function() {
    class BinaryTreeNode {
        constructor(div, left, right) {
            this.div = div;
            this.left = left;
            this.right = right;
        }
    }
    
    let container = document.getElementById("container");
    let root = initTree(document.getElementById("root"));
    
    document.getElementById("preOrder").onclick = function () { preOrder(root); };
    document.getElementById("inOrder").onclick = function () { inOrder(root); };
    document.getElementById("postOrder").onclick = function () { postOrder(root); };
    
    function initTree(node) {
        if (node == null) return null;
        return new BinaryTreeNode(node, initTree(node.children[0]), initTree(node.children[1]));
    }
    
    async function preOrder(node) {
        if (node != null) {
            await visit(node);
            await preOrder(node.left);
            await preOrder(node.right);
        }
    }
    
    async function inOrder(node) {
        if (node != null) {
            await inOrder(node.left);
            await visit(node);
            await inOrder(node.right);
        }
    }
    
    async function postOrder(node) {
        if (node != null) {
            await postOrder(node.left);
            await postOrder(node.right);
            await visit(node);
        }
    }
    
    async function visit(node) {
        node.div.className = "highlighted";
        await sleep(500);
        node.div.className = "";
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}());