const board = document.querySelector('#gameBoard');
const log = document.querySelector('#log');

const gameBoard = (() => {
    let board = [];

    let isRendered = false;

    const placeMarker = (x, player) => board[x] = player;

    const getTile = (x) => {return board[x]};

    let matchThree = () => {
        // Horizontal
        if (board[0] != undefined && (board[0] == board[1] && board[0] == board[2]))
            return true;
        else if (board[3] != undefined && (board[3] == board[4] && board[3] == board[5]))
            return true;
        else if (board[6] != undefined && (board[6] == board[7] && board[6] == board[8]))
            return true;
        // Vertical
        else if (board[0] != undefined && (board[0] == board[3] && board[0] == board[6]))
            return true;
        else if (board[1] != undefined && (board[1] == board[4] && board[1] == board[7]))
            return true;
        else if (board[2] != undefined && (board[2] == board[5] && board[2] == board[8]))
            return true;
        // Diagonal
        else if (board[0] != undefined && (board[0] == board[4] && board[0] == board[8]))
            return true;
        else if (board[2] != undefined && (board[2] == board[4] && board[2] == board[6]))
            return true;
        else
            return false;
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++)
            board[i] = undefined;
    }

    return {
        isRendered,
        placeMarker,
        getTile,
        matchThree,
        reset,
    }
})();

const Player = (player) => {
    let marker = player;
    const getMarker = () => {return marker};
    return {
        getMarker,
    }
};

const x = Player('X');
const o = Player('O');

const game = (() => {
    let turn = 0;
    let currentPlayer = x.getMarker();
    let active = false;

    const turnPlus = () => {
        if (!end()) {
            turn++;
        } else {
            //log.textContent = `${game.getCurrentPlayer()} has won. Congratulations!`;
        }
        if (currentPlayer == 'X')
            currentPlayer = o.getMarker();
        else
            currentPlayer = x.getMarker();
    }

    const getTurn = () => {return turn}; 

    const getCurrentPlayer = () => {return currentPlayer};

    const isActive = () => {return active};

    const start = () => {
        active = true;
        log.textContent = `The Game has started`;
    }

    const end = () => {
        if (gameBoard.matchThree()) {
            active = false;
            log.textContent = `${game.getCurrentPlayer()} has won. Congratulations!`;
            return true;
        }
        else if (!gameBoard.matchThree() && turn >= 8) {
            active = false;
            log.textContent = 'The game is a tie';
            return true;
        }
        else
            return false;
    }

    const reset = () => {
        turn = 0;
        let xTiles = document.querySelectorAll('.xTile');
        xTiles.forEach((element) => {
            element.textContent = '';
            element.classList.remove('xTile');
        });
        let oTiles = document.querySelectorAll('.oTile');
        oTiles.forEach((element) => {
            element.textContent = '';
            element.classList.remove('oTile');
        });
        gameBoard.reset();
        start();
    }

    return {
        turnPlus,
        getTurn,
        getCurrentPlayer,
        isActive,
        start,
        end,
        reset,
    }
})();

function render() {
    let i = 0;
    if (!gameBoard.isRendered) {
        while(i < 9) {
            let tile = document.createElement('div');
            board.appendChild(tile);
            tile.classList.add('tile');
            tile.setAttribute('id', `tile${i}`);
            let marker = document.createElement('span');
            tile.appendChild(marker);
            i++;
        }
    }
    gameBoard.isRendered = true;
    addListeners();
}

function playerMark(num) {
    var tile = document.getElementById(`tile${num}`);
    game.placeMarker(num, game.getCurrentPlayer());
    tile.textContent = game.getCurrentPlayer();
    game.turnPlus();
}

function resetGame() {
    game.reset();
    log.textContent = `The game has been reset. Player ${game.getCurrentPlayer()} starts next.`;
}

function addListeners() {
    document.addEventListener('click', function(event) {
        if (event.target.matches('.tile') && game.isActive() == true) {
            let num = event.target.id.slice(4, 5);
            let marker = event.target.firstChild;
            marker.textContent = game.getCurrentPlayer();
            if (game.getCurrentPlayer() == 'X')
                marker.classList.add('xTile');
            else
                marker.classList.add('oTile');

            gameBoard.placeMarker(num, game.getCurrentPlayer());
            game.turnPlus();
        }
    }, false);
}

render();
