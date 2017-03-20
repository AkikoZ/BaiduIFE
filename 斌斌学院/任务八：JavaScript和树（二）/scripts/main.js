/**
 * Created by ZZQ on 2017/3/18.
 */
(function() {
    class TreeNode {
        constructor(div, content, children) {
            this.div = div;
            this.content = content;
            this.children = children;
        }
    }
    
    let input = document.getElementById("input");
    let container = document.getElementById("container");
    let root = initTree(document.getElementById("root"));
    
    document.getElementById("preOrder").onclick = function () {
        clearHighlight();
        preOrder(root);
    };
    document.getElementById("postOrder").onclick = function () {
        clearHighlight();
        postOrder(root);
    };
    document.getElementById("search").onclick = function () {
        clearHighlight();
        find(input.value);
    };
    
    function clearHighlight() {
        for (let highlighted of container.getElementsByClassName("highlighted"))
            highlighted.className = "";
    }
    
    function initTree(node) {
        if (node == null) return null;
        let subDivs = [];
        let children = node.children;
        for (let child of children)
            if (child.nodeName == "DIV") subDivs.push(child);
        let subTrees = [];
        for (let subDiv of subDivs)
            subTrees.push(initTree(subDiv));
        return new TreeNode(node, getContent(node), subTrees);
    }
    
    function getContent(node) {
        let span = node.getElementsByTagName("span")[0];
        return span == null ? "" : span.innerText;
    }
    
    async function find(key) {
        if (!(await preOrder(root, key))) alert("Not found.");
    }
    
    async function preOrder(node, key) {
        if (node != null) {
            if (await visit(node, key)) return true;
            for (let child of node.children)
                if (await preOrder(child, key)) return true;
        }
    }
    
    async function postOrder(node, key) {
        if (node != null) {
            for (let child of node.children)
                if (await postOrder(child, key)) return true;
            if (await visit(node, key)) return true;
        }
    }
    
    async function visit(node, key) {
        node.div.className = "highlighted";
        if (key && key == node.content) return true;
        await sleep(500);
        node.div.className = "";
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}());