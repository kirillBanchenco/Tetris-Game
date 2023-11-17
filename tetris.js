import { 
    playfield_rows, 
    playfield_columns,
    block_name,
    blocks,
    getRandomBlock,
    rotateBlock
} from "./utilities.js";

export class Tetris {
    constructor() {
        this.playfield;
        this.block;
        this.isGameOver = false;

        this.initiate();
    }

    initiate() {
        this.generatePlayField();
        this.generateBlock();
    }

    generatePlayField() {
        this.playfield = new Array(playfield_rows).fill().map(() => new Array(playfield_columns).fill(0));
    }

    generateBlock() {
        const name = getRandomBlock(block_name);
        const shape = blocks[name];

        const column = playfield_columns / 2 - Math.floor(shape.length / 2);
        const row = -2;

        this.block = {
            name,
            shape,
            row,
            column,
            ghostRow: row,
            ghostColumn: column
        }

        this.calculateGhostPosition();
    }

    rotateShape() {
        const oldShape = this.block.shape;
        const rotatedBlock = rotateBlock(this.block.shape);
        this.block.shape = rotatedBlock;

        if (!this.isValid()) {
            this.block.shape = oldShape;
        } else {
            this.calculateGhostPosition();
        }
    }

    moveRight() {
        this.block.column += 1;

        if (!this.isValid()) {
            this.block.column -= 1;
        } else {
            this.calculateGhostPosition();
        }
    }

    moveLeft() {
        this.block.column -= 1;

        if (!this.isValid()) {
            this.block.column += 1;
        } else {
            this.calculateGhostPosition();
        }
    }

    moveDown() {
        this.block.row += 1;

        if (!this.isValid()) {
            this.block.row -= 1;

            this.placeBlock();
        }
    }

    isValid() {
        const shapeSize = this.block.shape.length;

        for (let row = 0; row < shapeSize; row++) {
            for (let column = 0; column < shapeSize; column++) {
                if (!this.block.shape[row][column]) continue;
                if (this.isOutside(row, column)) return false;
                if (this.isCollides(row, column)) return false;
            }
        }

        return true;
    }

    isOutside(row, column) {
        return this.block.column + column < 0 ||
            this.block.column + column >= playfield_columns ||
            this.block.row + row >= this.playfield.length;
    }

    isCollides(row, column) {
        return this.playfield[this.block.row + row]?.[this.block.column + column];
    }

    placeBlock() {
        const blockSize = this.block.shape.length;

        for (let row = 0; row < blockSize; row++) {
            for (let column = 0; column < blockSize; column++) {
                if (!this.block.shape[row][column]) continue;
                if (this.isOutsideOfTop(row)) {
                    this.isGameOver = true;
                    
                    return;
                }
    
                this.playfield[this.block.row + row][this.block.column + column] = this.block.name;
            }
        }

        this.processFilledRows();
        this.generateBlock();
    }

    isOutsideOfTop(row) {
        return this.block.row + row < 0;
    }

    processFilledRows() {
        const filledRows = this.findFilledRows();

        this.removeFilledRows(filledRows);
    }

    findFilledRows() {
        const filledRows = [];

        for (let row = 0; row < playfield_rows; row++) {
            if (this.playfield[row].every(cell => Boolean(cell))) {
                filledRows.push(row);
            }
        }

        return filledRows;
    }

    removeFilledRows(filledRows) {
        filledRows.forEach(row => {
            this.dropRowsAbove(row);
        });
    }

    dropRowsAbove(rowToDelete) {
        for (let row = rowToDelete; row > 0; row--) {
            this.playfield[row] = this.playfield[row - 1];
        }

        this.playfield[0] = new Array(playfield_columns).fill(0);
    }

    calculateGhostPosition() {
        const blockRow = this.block.row;

        this.block.row++;

        while (this.isValid()) {
            this.block.row++;
        }
        this.block.ghostRow = this.block.row - 1;
        this.block.ghostColumn = this.block.column
        this.block.row = blockRow;
    }
}