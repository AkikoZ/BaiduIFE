/**
 * Created by ZZQ on 2017/3/16.
 */
(function() {
    let input = document.getElementById("input");
    let container = document.getElementById("container");
    
    function makeBlockWithNumber(num) {
        let block = document.createElement("div");
        block.innerText = num;
        block.style.cssText = "background-color: red; color: white; display: inline-block; padding: 0.5rem; margin: 0.5rem 0.5rem 0 0";
        block.onclick = function () { this.parentNode.removeChild(this); };
        return block;
    }
    
    document.getElementById("left-in").onclick = function () {
        container.insertBefore(makeBlockWithNumber(input.value), container.firstChild);
    };
    
    document.getElementById("right-in").onclick = function () {
        container.appendChild(makeBlockWithNumber(input.value));
    };
    
    document.getElementById("left-out").onclick = function () {
        if (container.children.length)
            container.removeChild(container.firstElementChild);
    };
    
    document.getElementById("right-out").onclick = function () {
        if (container.children.length)
            container.removeChild(container.lastElementChild);
    };
}());