document.addEventListener('DOMContentLoaded', () => {
    const chefId = localStorage.getItem('chefId');
    if (!chefId) {
        console.error("Chef ID not found in localStorage");
        window.location.href = 'login.html';
        return;
    }

    console.log("Chef ID retrieved from localStorage:", chefId);

    fetch(`/api/recipes/${chefId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(recipes => {
            if (!Array.isArray(recipes)) {
                throw new TypeError('Expected an array of recipes');
            }

            const recipeList = document.getElementById('recipe-list');
            recipeList.innerHTML = '';

            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.setAttribute('data-recipe-id', recipe.id);

                const recipeDetails = document.createElement('div');
                recipeDetails.className = 'recipe-details';
                recipeDetails.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>By Chef ID: ${recipe.chef_id}</p>
                    <p>${recipe.time} - ${recipe.difficulty}</p>
                    <p>For Conservation: ${recipe.conservation}</p>
                `;

                const recipeImage = document.createElement('img');
                recipeImage.className = 'recipe-image';
                recipeImage.src = recipe.image_url;
                recipeImage.alt = recipe.title;

                const recipeActions = document.createElement('div');
                recipeActions.className = 'recipe-actions';
                recipeActions.innerHTML = `
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                `;

                recipeActions.querySelector('.edit-button').addEventListener('click', () => {
                    localStorage.setItem('editRecipe', JSON.stringify(recipe));
                    window.location.href = 'formchef.html';
                });

                recipeActions.querySelector('.delete-button').addEventListener('click', () => {
                    fetch(`/api/recipes/${recipe.id}`, { method: 'DELETE' })
                        .then(response => response.json())
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(error => console.error('Error:', error));
                });

                recipeCard.appendChild(recipeDetails);
                recipeCard.appendChild(recipeImage);
                recipeCard.appendChild(recipeActions);

                recipeList.appendChild(recipeCard);
            });
        })
        .catch(error => console.error('Error:', error));
});
