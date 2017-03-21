/**
 * Created by ZZQ on 2017/3/18.
 */
(function() {
    let searchInput = document.getElementById("searchInput");
    let input = document.getElementById("input");
    let addBtn = document.getElementById("add");
    let deleteBtn = document.getElementById("delete");
    let container = document.getElementById("container");
    let root = document.getElementById("root");
    let current = null;
    initNodes(root);
    
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
        find(searchInput.value);
    };
    addBtn.onclick = function () {
        let content = input.value;
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<span>${content}</span>`;
        newDiv.onclick = respond;
        current.appendChild(newDiv);
    };
    deleteBtn.onclick = function () {
        current.parentNode.removeChild(current);
        current = null;
        addBtn.disabled = true;
        deleteBtn.disabled = true;
    };
    
    function clearHighlight() {
        for (let highlighted of container.getElementsByClassName("highlighted"))
            highlighted.className = "";
    }
    
    function initNodes(node) {
        if (node == null) return;
        node.onclick = respond;
        let children = node.children;
        for (let child of children) {
            if (child.nodeName == "DIV") {
                child.onclick = respond;
                initNodes(child);
            }
        }
    }
    
    function respond(event) {
        event.stopPropagation();
        if (current) current.className = "";
        if (current == this) {
            current = null;
            addBtn.disabled = true;
            deleteBtn.disabled = true;
        } else {
            current = this;
            current.className = "highlighted";
            addBtn.disabled = false;
            deleteBtn.disabled = current == root;
        }
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
                if (child.nodeName == "DIV")
                    if (await preOrder(child, key)) return true;
        }
    }
    
    async function postOrder(node, key) {
        if (node != null) {
            for (let child of node.children)
                if (child.nodeName == "DIV")
                    if (await postOrder(child, key)) return true;
            if (await visit(node, key)) return true;
        }
    }
    
    async function visit(node, key) {
        node.className = "highlighted";
        if (key && key == getContent(node)) return true;
        await sleep(500);
        node.className = "";
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}());