// Utility functions for localStorage
function saveRecipesToStorage(recipesArr) {
  localStorage.setItem("recipes", JSON.stringify(recipesArr));
}

function loadRecipesFromStorage() {
  const data = localStorage.getItem("recipes");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

// Sample data for demonstration
let recipes = loadRecipesFromStorage();
if (!recipes) {
  recipes = [
    { name: "Spaghetti Bolognese", ingredients: ["spaghetti", "beef", "tomato"] },
    { name: "Chicken Salad", ingredients: ["chicken", "lettuce", "tomato"] },
    { name: "Tomato Soup", ingredients: ["tomato", "onion", "garlic"] },
  ];
  saveRecipesToStorage(recipes);
}

// Create search UI
const app = document.createElement("div");
app.innerHTML = `
  <input type="text" id="searchInput" placeholder="Search by name or ingredient" />
  <button id="searchBtn">Search</button>
  <button id="resetBtn">Reset</button>
  <div id="message"></div>
  <ul id="results"></ul>
`;
document.body.appendChild(app);

/**
 * Search recipes by name or ingredient.
 * @param {Array} recipesArr - Array of recipe objects.
 * @param {string} searchTerm - The search term to match.
 * @returns {Array} Filtered recipes.
 */
function searchRecipes(recipesArr, searchTerm) {
  const lowerTerm = searchTerm.toLowerCase();
  return recipesArr.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowerTerm) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(lowerTerm))
  );
}

// Display results
function displayResults(results, message = "") {
  const resultsList = document.getElementById("results");
  const messageDiv = document.getElementById("message");
  resultsList.innerHTML = "";
  messageDiv.textContent = message;
  if (results.length === 0) {
    resultsList.innerHTML = "<li>No recipes found.</li>";
    return;
  }
  results.forEach((recipe) => {
    const li = document.createElement("li");
    li.textContent = `${recipe.name} (Ingredients: ${recipe.ingredients.join(", ")})`;
    resultsList.appendChild(li);
  });
}

// Helper to show a temporary message
function showTempMessage(msg, duration = 2000) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = msg;
  setTimeout(() => {
    messageDiv.textContent = "";
  }, duration);
}

// Event listeners
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  const filtered = searchRecipes(recipes, query);
  displayResults(filtered);
  showTempMessage("Search completed.");
});

// Optional: search as you type
document.getElementById("searchInput").addEventListener("input", () => {
  const query = document.getElementById("searchInput").value;
  const filtered = searchRecipes(recipes, query);
  displayResults(filtered);
});

// Reset button event listener
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  displayResults(recipes, "Search reset. Showing all recipes.");
  showTempMessage("Search reset. Showing all recipes.");
});

// Initial display (show all recipes)
displayResults(recipes);