const { Console } = require("./console");

const console = new Console();
const DIM = 19;
let grid = "";
for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        grid += (0 < i && i < DIM - 1) && (0 < j && j < DIM - 1) ? "O" : "·";
    }
    grid += "\n";
}
console.writeln(grid);
