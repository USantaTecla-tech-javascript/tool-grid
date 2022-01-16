const { Console } = require("./console");

const console = new Console();
const DIM = 19;
let grid = "";
for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
        grid += i < 5 && j < 5 ? "O" : "·";
    }
    grid += "\n";
}
console.writeln(grid);
