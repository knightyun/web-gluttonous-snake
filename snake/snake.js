var H = 30,
    W = 30;
var mapArr = new Array(H);
var sx, sy;
var moveX, moveY;
var randX = 0,
    randY = 0;
var foodFlag = 0;
var input = '';
var speed = 2;
var l = 0;
var bx = [],
    by = [];
var drt = 'h-right';
var stopFlag = 0;
var root = document.getElementById("div-root");
var setSpeed = document.getElementById("speed");
var setIcon = document.getElementById("set-icon");
var setContent = document.getElementById("set-content");
var msg = document.getElementById("msg");
setContent.style.display = 'none';
var alertBtn = document.getElementById("alert-btn");
var alertMsg = document.getElementById("alert-msg");
var alertBox = document.getElementById("alert-box");
// menu button
setIcon.onclick = function() {
    if (setContent.style.display == "none") {
        setContent.style.display = "inline-block";
        setIcon.style.backgroundColor = "#ddd";
    } else {
        setContent.style.display = "none";
        setIcon.style.backgroundColor = "#ccc";
    }
}

// initialize map array
function InitMap() {
    for (y = 0; y < H; y++) {
        mapArr[y] = new Array(W);
        for (x = 0; x < W; x++) {
            mapArr[y][x] = 0;
        }
    }
    for (y = 0; y < H; y++) {
        for (x = 0; x < W; x++) {
            if (x == 0 || x == W - 1 || y == 0 || y == H - 1) {
                mapArr[y][x] = 1;
            }
        }
    }
}

// set random food
function SetRandNum() {
    while (mapArr[randY][randX] != 0 && foodFlag == 0) {
        randX = Math.round(Math.random() * W);
        randY = Math.round(Math.random() * H);
    }
    mapArr[randY][randX] = 4;
    foodFlag = 1;
}

// set snake body view
function SetSnakeNum() {
    var up = document.getElementById("up");
    var down = document.getElementById("down");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var stop = document.getElementById("stop");
    up.onclick = function() {
        input = '2';
    }
    down.onclick = function() {
        input = '8';
    }
    left.onclick = function() {
        input = '4';
    }
    right.onclick = function() {
        input = '6';
    }
    stop.onclick = function() {
        if (stopFlag == 0) {
            clearInterval(int);
            stopFlag = 1;
        } else {
            int = setInterval(StartGame, 1000 / speed);
            stopFlag = 0;
        }
    }

    // snake turn direction
    switch (input) {
        case 'W':
        case '2':
            if (drt == "h-up" || drt == "h-left" || drt == "h-right") {
                sy--;
                drt = "h-up";
            } else {
                sy++;
                drt = "h-down";
            }
            break;
        case 'S':
        case '8':
            if (drt == "h-down" || drt == "h-left" || drt == "h-right") {
                sy++;
                drt = "h-down";
            } else {
                sy--;
                drt = "h-up";
            }
            break;
        case 'A':
        case '4':
            if (drt == "h-left" || drt == "h-up" || drt == "h-down") {
                sx--;
                drt = "h-left";
            } else {
                sx++;
                drt = "h-right";
            }
            break;
        case 'D':
        case '6':
            if (drt == "h-right" || drt == "h-up" || drt == "h-down") {
                sx++;
                drt = "h-right";
            } else {
                sx--;
                drt = "h-left";
            }
            break;
    }

    for (i = 0; i < l; i++) {
        mapArr[by[i]][bx[i]] = 2;
    }

    // judge game over
    if (mapArr[sy][sx] == 1 || mapArr[sy][sx] == 2) {
        clearInterval(int);
        input = '';
        alertBox.style.display = 'inline-block';
        alertMsg.innerHTML = "Game Over !!! <br /><br />可以改变速度试试 ^_^";
        alertBtn.innerHTML = "重新开始";
    }

    mapArr[sy][sx] = 3;
    for (i = l; i > 0; i--) {
        bx[i] = bx[i - 1];
        by[i] = by[i - 1];
    }
    bx[0] = sx, by[0] = sy;

}

// print game view
function PrintMap() {
    for (y = 0; y < H; y++) {
        mapRow = document.createElement("div");
        mapRow.className = "map-row";
        root.appendChild(mapRow);
        for (x = 0; x < W; x++) {
            mapCol = document.createElement("div");
            switch (mapArr[y][x]) {
                case 0:
                    mapCol.className = "inner";
                    mapRow.appendChild(mapCol);
                    break;
                case 1:
                    mapCol.className = "wall";
                    mapRow.appendChild(mapCol);
                    break;
                case 2:
                    mapCol.className = "s-body";
                    mapRow.appendChild(mapCol);
                    break;
                case 3:
                    mapCol.className = "s-head" + " " + drt;
                    mapRow.appendChild(mapCol);
                    break;
                case 4:
                    mapCol.className = "food";
                    mapRow.appendChild(mapCol);
                    break;
            }
        }
    }
}

function GetInput() {
    window.addEventListener("keydown", function() {
        input = String.fromCharCode(event.keyCode);
    });
}

function ClearBg() {
    root.innerHTML = "";
}

function EatFood() {
    if (mapArr[sy][sx] == 4) {
        l++;
        mapArr[sy][sx] = 3;
        foodFlag = 0;
    }
}

function SetSpeed() {
    setSpeed.onchange = function() {
        speed = this.value;
        setContent.style.display = 'none';
    }
}

function InitXY() {
    l = 0;
    drt = 'h-right';
    sx = 4, sy = 4;
    for (i = 0; i < l; i++) {
        bx[i] = sx,
            by[i] = sy;
    }
}

InitXY();

GetInput();

function StartGame() {
    ClearBg();
    InitMap();
    SetSpeed();
    SetSnakeNum();
    SetRandNum();
    PrintMap();
    EatFood();
    document.getElementById("score").innerHTML = l;
}

StartGame();
alertMsg.innerHTML = "可以在左侧菜单设置速度<br><br>电脑直接<br>'W(上)', 'A(左)', 'S(下)', 'D(右)', 'F(暂停)'<br>控制方向";
alertBtn.onclick = function() {
    StartGame();
    InitXY();
    this.parentNode.style.display = 'none';
    input = '6';
    int = setInterval(StartGame, 1000 / speed);

}