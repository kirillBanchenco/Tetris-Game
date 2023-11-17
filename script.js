import { Tetris } from "./tetris.js";
import { convertPositionToIndex, playfield_columns, playfield_rows } from "./utilities.js";

let requestId, timeout;

const tetris = new Tetris();
const cells = document.querySelectorAll('body > div *');

down();

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'c':
            tetris.rotateShape();

            draw();
            break;
        case 's':
            down();
            break;
        case 'd':
            tetris.moveRight();

            draw();
            break;
        case 'a':
            tetris.moveLeft();

            draw();
            break;
    }
});

function down() {
    tetris.moveDown();

    draw();
    stopLoop();
    startLoop();

    if (tetris.isGameOver) {
        gameOver();
    }
}

function startLoop() {
    timeout = setTimeout(() => requestId = requestAnimationFrame(down), 300);
}

function stopLoop() {
    cancelAnimationFrame(requestId);
    clearTimeout(timeout);
}

function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));

    drawPlayField();
    drawBlock();
    drawGhostBlock();
}

function drawPlayField() {
    for (let row = 0; row < playfield_rows; row++) {
        for (let column = 0; column < playfield_columns; column++) {
            if (!tetris.playfield[row][column]) continue;

            const name = tetris.playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);

            cells[cellIndex].classList.add(name);
        }
    }
}

function drawBlock() {
    const name = tetris.block.name;
    const blockSize = tetris.block.shape.length;

    for (let row = 0; row < blockSize; row++) {
        for (let column = 0; column < blockSize; column++) {
            if (!tetris.block.shape[row][column]) continue;
            if (tetris.block.row + row < 0) continue;

            const cellIndex = convertPositionToIndex(tetris.block.row + row, tetris.block.column + column);

            cells[cellIndex].classList.add(name);
        }
    }
}

function drawGhostBlock() {
    const blockSize = tetris.block.shape.length;

    for (let row = 0; row < blockSize; row++) {
        for (let column = 0; column < blockSize; column++) {
            if (!tetris.block.shape[row][column]) continue;
            if (tetris.block.ghostRow + row < 0) continue;

            const cellIndex = convertPositionToIndex(tetris.block.ghostRow + row, tetris.block.ghostColumn + column);

            cells[cellIndex].classList.add('ghost');
        }
    }
}

function gameOver() {
    location.reload();
}