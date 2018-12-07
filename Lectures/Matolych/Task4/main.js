const SimpleQuadrilateral = require("./quadrilateral");

// Range for quadrilaterals
const MIN = 1, MAX = 5;
// Number of quadrilaterals
const COUNT = 100;

const quadrilaterals = [...new Array(COUNT)].map(() => SimpleQuadrilateral.random(MIN, MAX));
console.log("Shapes: ");
quadrilaterals.forEach((q, i) => {
    console.log(`${i}: ${q}, perimeter = ${q.perimeter}`);
});

const categories = {
    squares: quadrilaterals.filter(q => q.type === "square"),
    parallelograms: quadrilaterals.filter(q => q.type === "parallelogram"),
    others: quadrilaterals.filter(q => q.type === "quadrilateral"),
}; 

console.log("Squares:", categories.squares);
console.log("Parallelograms:", categories.parallelograms);