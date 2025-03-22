const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes';

const recipesContainer = document.querySelector('#recipes');

async function loadPage(pageUrl) {
    const mainContent = document.getElementById('main-content');
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;
}

function renderRecipes(recipes) {
    recipesContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
                <img src="${recipe.image}" class="card-img"/>
                <div class="description">
                    <h1>${recipe.name}</h1>
                    <hr>
                    <h2>Instructions</h2>
                    <p class="instructions">${recipe.instructions}</p>
                </div>
                <div class="action-btns">
                    <button class="btn-update" onclick="updateRecipe('${recipe.id}')"> <i class="fa fa-pencil"></i> Update</button>
                    <button class="btn-delete" onclick="deleteRecipe('${recipe.name}')"> <i class="fa fa-trash"></i> Delete</button>
                </div>
            </div>
    `).join('');
}

async function fetchRecipes() {
    
    let recipes = JSON.parse(localStorage.getItem('recipes'));

    if (!recipes) {
        const response = await fetch(BASE_URL);
        recipes = await response.json();
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    return recipes;
}

async function displayRecipes(){

    const recipes = await fetchRecipes();
    renderRecipes(recipes);

}

function deleteRecipe(recipeName) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    let updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    renderRecipes(recipes);    
}

function addRecipe(event) {
    event.preventDefault();

    const recipeName = document.querySelector('#recipe-name').value;
    const recipeImg = document.querySelector('#recipe-img').value;
    const recipeIngredients = document.querySelector('#recipe-ingredients').value;
    const recipeInstructions = document.querySelector('#recipe-instructions').value;

    let recipes = JSON.parse(localStorage.getItem('recipes'));

    const newRecipe = {
        id: recipes.length + 1,
        name: recipeName,
        image: recipeImg,
        ingredients: recipeIngredients,
        instructions: recipeInstructions
    };

    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    recipeName.value = "";
    recipeImg.value = "";
    recipeIngredients.value = "";
    recipeInstructions.value = "";

    window.location.href = "index.html";

}

async function updateRecipe(targetId) {
    const recipes = await fetchRecipes();
    let targetRecipe = recipes.find(recipe => recipe.id === targetId);

    deleteRecipe(targetRecipe.name);

    await loadPage('edit_page.html');

    document.querySelector("#recipe-name").value = targetRecipe.name;
    document.querySelector("#recipe-img").value = targetRecipe.image;
    document.querySelector("#recipe-ingredients").value = targetRecipe.ingredients;
    document.querySelector("#recipe-instructions").value = targetRecipe.instructions;

}


document.addEventListener('DOMContentLoaded', displayRecipes);
