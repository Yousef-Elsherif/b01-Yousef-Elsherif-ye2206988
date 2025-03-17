const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes';

async function loadPage(pageUrl) {
    const mainContent = document.getElementById('main-content');
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;
}

async function fetchAndDisplayRecipes() {
    const recipesContainer = document.querySelector('#recipes');

    let recipes = JSON.parse(localStorage.getItem('recipes'));

    if (!recipes) {
        const response = await fetch(BASE_URL);
        recipes = await response.json();
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        recipesContainer.innerHTML += `
            <div class="recipe-card">
                <img src="${recipe.image}" class="card-img"/>
                <div class="description">
                    <h1>${recipe.name}</h1>
                    <hr>
                    <h2>Instructions</h2>
                    <p class="instructions">${recipe.instructions}</p>
                </div>
                <div class="action-btns">
                    <button class="btn-update"> <i class="fa fa-pencil"></i> Update</button>
                    <button class="btn-delete" onclick="deleteRecipe('${recipe.name}')"> <i class="fa fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
    });
}

function deleteRecipe(recipeName) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    let updatedRecipes = recipes.filter(recipe => recipe.name !== recipeName);

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    document.querySelectorAll('.recipe-card').forEach(card => {
        if (card.querySelector('h1').textContent === recipeName) {
            card.remove();
        }
    });
}

function addRecipe(event) {
    event.preventDefault();

    const recipeName = document.querySelector('#recipe-name').value;
    const recipeImg = document.querySelector('#recipe-img').value;
    const recipeIngredients = document.querySelector('#recipe-ingredients').value;
    const recipeInstructions = document.querySelector('#recipe-instructions').value;

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const newRecipe = {
        id: recipes.length + 1,
        name: recipeName,
        image: recipeImg,
        ingredients: recipeIngredients,
        instructions: recipeInstructions
    };

    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    fetchAndDisplayRecipes();
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayRecipes);
