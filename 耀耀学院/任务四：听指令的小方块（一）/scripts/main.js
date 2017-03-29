/**
 * Created by ZZQ on 2017/3/23.
 */
(function() {
    class Block {
        constructor(x, y, d) {
            this.x = x;
            this.y = y;
            this.d = d;

            let div = document.createElement("div");
            div.id = "block";
            div.style.left = `${30 + size * this.x}px`;
            div.style.top = `${30 + size * this.y}px`;
            div.style.transform = `rotate(${d}deg)`;
            body.appendChild(div);
            this.div = div
        }

        turnLeft() {
            this.d -= 90;
            this.div.style.transform = `rotate(${this.d}deg)`;
        }

        turnRight() {
            this.d += 90;
            this.div.style.transform = `rotate(${this.d}deg)`;
        }

        turnBack() {
            this.d += 180;
            this.div.style.transform = `rotate(${this.d}deg)`;
        }

        go() {
            switch (this.d % 360) {
                case 0:
                    if (this.y > 0) this.y--;
                    break;
                case 180:
                case -180:
                    if (this.y < height - 1) this.y++;
                    break;
                case 90:
                case -270:
                    if (this.x < width - 1) this.x++;
                    break;
                case -90:
                case 270:
                    if (this.x > 0) this.x--;
                    break;
            }
            this.div.style.left = `${30 + size * this.x}px`;
            this.div.style.top = `${30 + size * this.y}px`;
        }
    }

    const width = 10;
    const height = 10;
    const size = 30;

    let body = document.getElementById("body");
    let boardHead = document.getElementById("boardHead");
    let boardBody = document.getElementById("boardBody");
    let input = document.getElementById("command");

    makeBoard(width, height);
    let block = new Block(0, 0, 0);

    document.getElementById("exec").onclick = function () {
        switch (input.value) {
            case "GO": block.go(); break;
            case "TUN LEF": block.turnLeft(); break;
            case "TUN RIG": block.turnRight(); break;
            case "TUN BAC": block.turnBack(); break;
        }
    };

    function makeBoard(width, height) {
        let headRow = document.createElement("tr");
        headRow.innerHTML = "<th></th>";
        boardHead.appendChild(headRow);
        for (let i = 1; i <= width; i++)
            headRow.innerHTML += `<th>${i}</th>`;
        for (let j = 1; j <= height; j++) {
            let bodyRow = document.createElement("tr");
            bodyRow.innerHTML = `<td>${j}</td>`;
            for (let i = 1; i <= width; i++)
                bodyRow.innerHTML += "<td></td>"
            boardBody.appendChild(bodyRow);
        }
    }
}());