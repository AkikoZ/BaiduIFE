/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {
    let subjects = ["语文", "数学", "英语"];
    let names = ["小明", "小红", "小亮"];
    let scores = [[80, 90, 70], [90, 60, 90], [60, 100, 70]];
    let sortFunctions = [];

    let tableHead = document.getElementById("tableHead");
    let tableBody = document.getElementById("tableBody");
    let rowContents = [];

    makeTable(subjects, names, scores, sortFunctions);

    function makeTable(subjects, names, scores, sortFunctions) {
        for (let i = 0; i < names.length; i++) {
            let rowContent = [names[i]];
            rowContent = rowContent.concat(scores[i]);
            rowContent.push(scores[i].reduce((pv, cv) => pv + cv, 0));
            rowContents.push(rowContent);
        }

        let headRow = document.createElement("tr");
        tableHead.appendChild(headRow);
        headRow.innerHTML += "<th>姓名</th>";
        for (let i = 0; i <= subjects.length; i++) {
            let headData = document.createElement("th");
            headData.innerText = i === subjects.length ? "总分" : subjects[i];
            let sortBtn = document.createElement("button");
            sortBtn.innerText = "排序";
            sortBtn.onclick = makeSortHandler(i, sortFunctions[i]);
            headData.appendChild(sortBtn);
            headRow.appendChild(headData);
        }

        refreshTableBody()
    }

    function refreshTableBody() {
        while (tableBody.firstElementChild)
            tableBody.removeChild(tableBody.firstChild);
        for (let rowContent of rowContents) {
            let bodyRow = document.createElement("tr");
            tableBody.appendChild(bodyRow);
            for (let rowData of rowContent)
                bodyRow.innerHTML += `<td>${rowData}</td>`
        }
    }

    function makeSortHandler(index, sortFunction) {
        if (!sortFunction)
            sortFunction = (x, y) => {
                if (x[index+1] > y[index+1]) return -1;
                if (x[index+1] < y[index+1]) return 1;
                return 0;
            };
        return function () {
            rowContents.sort(sortFunction);
            refreshTableBody()
        }
    }
}());