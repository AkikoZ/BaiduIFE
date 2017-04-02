/**
 * Created by ZZQ on 2017/3/29.
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
            document.body.appendChild(div);
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

        translateLeft() {
            if (this.x > 0) this.x--;
            this.div.style.left = `${30 + size * this.x}px`;
        }

        translateRight() {
            if (this.x < width - 1) this.x++;
            this.div.style.left = `${30 + size * this.x}px`;
        }

        translateTop() {
            if (this.y > 0) this.y--;
            this.div.style.top = `${30 + size * this.y}px`;
        }

        translateBottom() {
            if (this.y < height - 1) this.y++;
            this.div.style.top = `${30 + size * this.y}px`;
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

        moveLeft() {
            this.d = -90;
            this.div.style.transform = `rotate(${this.d}deg)`;
            this.go();
        }

        moveRight() {
            this.d = 90;
            this.div.style.transform = `rotate(${this.d}deg)`;
            this.go();
        }

        moveTop() {
            this.d = 0;
            this.div.style.transform = `rotate(${this.d}deg)`;
            this.go();
        }

        moveBottom() {
            this.d = 180;
            this.div.style.transform = `rotate(${this.d}deg)`;
            this.go();
        }
    }

    const width = 10;
    const height = 10;
    const size = 30;

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
            case "TRA LEF": block.translateLeft(); break;
            case "TRA RIG": block.translateRight(); break;
            case "TRA TOP": block.translateTop(); break;
            case "TRA BOT": block.translateBottom(); break;
            case "MOV LEF": block.moveLeft(); break;
            case "MOV RIG": block.moveRight(); break;
            case "MOV TOP": block.moveTop(); break;
            case "MOV BOT": block.moveBottom(); break;
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