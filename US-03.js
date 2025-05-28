class Recipe {
    constructor(name, ingredients, instructions) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}

const recipes = [
    new Recipe('Pasta Carbonara', ['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'], 'Cook spaghetti, fry bacon, mix eggs and cheese, combine all ingredients.'),
    new Recipe('Chicken Stir-Fry', ['chicken breast', 'bell peppers', 'onion', 'soy sauce', 'garlic', 'ginger'], 'Stir-fry chicken, add vegetables, season with soy sauce, garlic, and ginger.'),
    new Recipe('Chocolate Chip Cookies', ['flour', 'sugar', 'butter', 'chocolate chips', 'vanilla extract', 'baking soda'], 'Cream butter and sugar, add flour, chocolate chips, and other ingredients, bake in oven.'),
];

function displayRecipes() {
    recipes.forEach(recipe => {
        console.log(`Recipe: ${recipe.name}`);
        console.log('Ingredients: ' + recipe.ingredients.join(', '));
        console.log('Instructions: ' + recipe.instructions);
        console.log('----------------------');
    });
}

displayRecipes();

const addRecipe = (name, ingredients, instructions) => {
    recipes.push(new Recipe(name, ingredients, instructions));
};

// Add one more recipe
addRecipe('Caesar Salad', ['romaine lettuce', 'croutons', 'parmesan cheese', 'lemon juice', 'olive oil', 'egg', 'Worcestershire sauce'], 'Toss lettuce with dressing, add croutons and cheese, enjoy!');

const undoAddRecipe = () => {
    recipes.pop();
};

// Undo the last recipe addition
undoAddRecipe();
// Display a compliance calendar
const displayComplianceCalendar = () => {
    console.log('\n--- COMPLIANCE CALENDAR ---\n');
    recipes.forEach((recipe, index) => {
        console.log(`${index + 1}. ${recipe.name}`);
    });
};

displayComplianceCalendar();
// Show all recipes again
console.log('\n--- AFTER ADDING NEW RECIPE ---\n');
displayRecipes();
