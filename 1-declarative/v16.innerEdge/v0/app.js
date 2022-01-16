const { Console } = require("./console");

const console = new Console();
const DIM = 19;
let grid = "";
for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        grid += (i == 1 || i == 17 || j == 1 || j == 17) && (i != 0 && i != 18) && (j != 0 && j != 18) ? "O" : "·";
    }
    grid += "\n";
}
console.writeln(grid);
