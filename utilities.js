export const playfield_rows = 20;
export const playfield_columns = 10;
export const block_name = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
export const blocks = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
}

export function getRandomBlock(array) {
    const randomBlock = Math.floor(Math.random() * array.length);

    return array[randomBlock];
}

export function convertPositionToIndex(row, column) {
    return row * playfield_columns + column;
}

export function rotateBlock(shape) {
    const legthShape = shape.length;
    const rotateShape = [];

    for (let i = 0; i < legthShape; i++) {
        rotateShape[i] = [];

        for (let j = 0; j < legthShape; j++) {
            rotateShape[i][j] = shape[legthShape - j - 1][i];
        }
    }

    return rotateShape;
}