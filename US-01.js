const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Wrap readline.question in a Promise for async/await usage
function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log("=== CLI Recipe Creator ===\n");

  // Prompt for recipe title
  const title = (await ask("Recipe Title: ")).trim();

  // Gather ingredients until user enters a blank line
  const ingredients = [];
  console.log("Enter ingredients (blank line to finish):");
  while (true) {
    const ing = (await ask(`Ingredient ${ingredients.length + 1}: `)).trim();
    if (!ing) break; // Stop if input is blank
    ingredients.push(ing);
  }

  // Gather steps until user enters a blank line
  const steps = [];
  console.log("Enter cooking steps (blank line to finish):");
  while (true) {
    const step = (await ask(`Step ${steps.length + 1}: `)).trim();
    if (!step) break; // Stop if input is blank
    steps.push(step);
  }

  // Output the formatted recipe
  console.log("\n=== Recipe ===");
  console.log(`\n${title}\n`);
  console.log("Ingredients:");
  ingredients.forEach((ing, i) => {
    console.log(`- ${ing}`);
  });
  console.log("\nSteps:");
  steps.forEach((step, i) => {
    console.log(`${i + 1}. ${step}`);
  });

  rl.close();
}

main();