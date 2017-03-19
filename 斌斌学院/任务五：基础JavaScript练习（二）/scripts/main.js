/**
 * Created by ZZQ on 2017/3/16.
 */
(function() {
    let input = document.getElementById("input");
    let container = document.getElementById("container");
    
    function makeBlockWithNumber(num) {
        let block = document.createElement("div");
        block.style.height = `${num}px`;
        block.onclick = removeSelf;
        return block;
    }
    
    function removeSelf() {
        this.parentNode.removeChild(this);
    }
    
    function validateInput() {
        if (container.children.length < 60) {
            let inputValue = input.value;
            if (!isNaN(parseFloat(inputValue)) && inputValue >= 10 && inputValue <= 100) {
                return true;
            } else {
                alert("请输入大小为10~100的数字！");
            }
        } else {
            alert("队列元素不能超过60个！");
        }
        return false;
    }
    
    async function insertionSort() {
        let blocks = container.children;
        for (let i = 1; i < blocks.length; i++) {
            for (let j = i; j > 0 && heightOf(blocks[j]) < heightOf(blocks[j - 1]); j--) {
                await sleep(100);
                swapBlock(blocks[j], blocks[j - 1]);
            }
        }
    }
    
    function swapBlock(block1, block2) {
        let clonedBlock1 = block1.cloneNode(true);
        clonedBlock1.onclick = removeSelf;
        let clonedBlock2 = block2.cloneNode(true);
        clonedBlock2.onclick = removeSelf;
        block2.parentNode.replaceChild(clonedBlock1, block2);
        block1.parentNode.replaceChild(clonedBlock2, block1);
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function heightOf(block) {
        return parseFloat(block.style.height);
    }
    
    document.getElementById("left-in").onclick = function () {
        if (validateInput())
            container.insertBefore(makeBlockWithNumber(input.value), container.firstChild);
    };
    
    document.getElementById("right-in").onclick = function () {
        if (validateInput())
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
    
    document.getElementById("generate").onclick = function () {
        while (container.firstElementChild)
            container.removeChild(container.firstChild);
        for (let i = 0; i < 60; i++) {
            container.appendChild(makeBlockWithNumber(Math.random() * 90 + 10));
        }
    };
    
    document.getElementById("sort").onclick = insertionSort;
}());