const player1 = "O";
const player2 = "X";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
    let flag = true;
    play_board.forEach(element => {
        if (element != player1 && element != player2) {
            flag = false;
        }
    });
    board_full = flag;
};


const check_line = (a, b, c) => {
    return (
        play_board[a] == play_board[b] &&
        play_board[b] == play_board[c] &&
        (play_board[a] == player1 || play_board[a] == player2)
    );
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            document.querySelector(`#block_${i}`).classList.add("win");
            document.querySelector(`#block_${i + 1}`).classList.add("win");
            document.querySelector(`#block_${i + 2}`).classList.add("win");
            return play_board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            document.querySelector(`#block_${i}`).classList.add("win");
            document.querySelector(`#block_${i + 3}`).classList.add("win");
            document.querySelector(`#block_${i + 6}`).classList.add("win");
            return play_board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        document.querySelector("#block_0").classList.add("win");
        document.querySelector("#block_4").classList.add("win");
        document.querySelector("#block_8").classList.add("win");
        return play_board[0];
    }
    if (check_line(2, 4, 6)) {
        document.querySelector("#block_2").classList.add("win");
        document.querySelector("#block_4").classList.add("win");
        document.querySelector("#block_6").classList.add("win");
        return play_board[2];
    }
    return "";
};

const check_for_winner = () => {
    let res = check_match()
    if (res == player1) {
        winner.innerText = "Winner is 0";
        winner.classList.add("playerWin");
        board_full = true
        setTimeout(() => alert('Winner is 0'), 500);
        setTimeout(location.reload.bind(location), 1000);
    } else if (res == player2) {
        winner.innerText = "Winner is X";
        winner.classList.add("player2Win");
        board_full = true
        setTimeout(() => alert('Winner is X'), 500);
        setTimeout(location.reload.bind(location), 1000);
    } else if (board_full) {
        winner.innerText = "Draw!";
        winner.classList.add("draw");
        setTimeout(() => alert('Draw!'), 500);
        setTimeout(location.reload.bind(location), 1000);
    }
};


const render_board = () => {
    board_container.innerHTML = ""
    play_board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`
        if (e == player1 || e == player2) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};


var connection = new signalR.HubConnectionBuilder().withUrl("/Game").build();



connection.start()

var room;
var counter = 0;
function joinToRoom(roomName) {
    room = roomName;
    document.getElementById("gameTable").hidden = true;
    document.getElementById("gameCont").hidden = false;
    connection.invoke("CreateRoom", roomName);
}

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}

var a = 0;
connection.on("ReceiveMessage", function (user, message) {
    if (a == 0) {
        play_board[parseInt(message)] = player1;
        a++;
    }
    else {
        play_board[parseInt(message)] = player2;
        a--;
    }
    game_loop();
});

const addPlayerMove = e => {
    if (!board_full && play_board[e] == "") {
        var message = e.toString();
        connection.invoke("SendMessage", message, room);
    }
};

const addComputerMove = () => {
    if (!board_full) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (play_board[selected] != "");
        play_board[selected] = player2;
        game_loop();
    }
};

const reset_board = () => {
    play_board = ["", "", "", "", "", "", "", "", ""];
    board_full = false;
    winner.classList.remove("playerWin");
    winner.classList.remove("computerWin");
    winner.classList.remove("draw");
    winner.innerText = "";
    render_board();
};

render_board();