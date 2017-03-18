/**
 * Created by ZZQ on 2017/3/17.
 */
(function() {
    let input = document.getElementById("input");
    let searchInput = document.getElementById("searchInput");
    let container = document.getElementById("container");
    
    function makeBlockWithText(text) {
        let block = document.createElement("div");
        block.innerText = text;
        block.onclick = function () { this.parentNode.removeChild(this); };
        return block;
    }
    
    document.getElementById("search").onclick = function () {
        let searchString = searchInput.value;
        for (let block of container.children) {
            block.className = "";
            if (block.innerText.search(searchString) != -1)
                block.className = "highlighted";
        }
    };
    
    document.getElementById("add").onclick = function () {
        let strings = input.value.split(/[\s,，、]+/);
        for (let string of strings)
            container.appendChild(makeBlockWithText(string));
    };
}());