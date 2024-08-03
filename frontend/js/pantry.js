document.addEventListener('DOMContentLoaded', () => {
    let ingredientsData = [];
    let mealsData = [];

    function fetchPantryData() {
        fetch('http://localhost:3063/api/pantry')
            .then(response => response.json())
            .then(data => {
                ingredientsData = data.ingredients;
                mealsData = data.meals;
                displayIngredients(ingredientsData);
                displayMeals(mealsData);
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }

    function displayIngredients(ingredients) {
        const ingredientList = document.querySelector('.ingredient-list');
        ingredientList.innerHTML = '';

        ingredients.forEach((ingredient) => {
            const ingredientItem = document.createElement('div');
            ingredientItem.classList.add('ingredient-item');

            ingredientItem.innerHTML = `
                <input type="checkbox" class="select-ingredient" data-id="${ingredient.ingredient_id}">
                <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                <div class="ingredient-details">
                    <h4>${ingredient.name}</h4>
                    <p>${ingredient.quantity} ${ingredient.unit}</p>
                </div>
            `;
            ingredientList.appendChild(ingredientItem);
        });

        addDeleteButton(ingredientList, 'ingredient');
    }

    function displayMeals(meals) {
        const mealList = document.querySelector('.meal-list');
        mealList.innerHTML = '';

        meals.forEach((meal) => {
            const mealItem = document.createElement('div');
            mealItem.classList.add('meal-item');

            mealItem.innerHTML = `
                <input type="checkbox" class="select-meal" data-id="${meal.meal_id}">
                <img src="${meal.image}" alt="${meal.name}" class="meal-image">
                <div class="meal-details">
                    <h4>${meal.name}</h4>
                    <p>${meal.date}</p>
                </div>
            `;
            mealList.appendChild(mealItem);
        });

        addDeleteButton(mealList, 'meal');
    }

    function addDeleteButton(parentElement, type) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => prepareToDeleteItems(type));
        parentElement.appendChild(deleteButton);
    }

    function prepareToDeleteItems(type) {
        const checkboxes = document.querySelectorAll(`.select-${type}:checked`);
        const idsToDelete = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

        if (type === 'ingredient') {
            deleteSelectedItems(idsToDelete, 'ingredient');
        } else if (type === 'meal') {
            deleteSelectedItems(idsToDelete, 'meal');
        }
    }

    function deleteSelectedItems(ids, type) {
        ids.forEach(id => {
            if (type === 'ingredient') {
                deleteIngredient(id);
            } else if (type === 'meal') {
                deleteMeal(id);
            }
        });
    }

    function deleteIngredient(id) {
        fetch(`http://localhost:3063/api/pantry/deleteIngredient/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'ingrédient');
            }
            return response.json();
        })
        .then(data => {
            console.log('Ingrédient supprimé:', data);
            fetchPantryData(); // Actualiser l'affichage des ingrédients après suppression
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }

    function deleteMeal(id) {
        fetch(`http://localhost:3063/api/pantry/deleteMeal/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du repas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Repas supprimé:', data);
            fetchPantryData(); // Actualiser l'affichage des repas après suppression
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }
    function filterPantryItems() {
        const searchBar = document.getElementById('searchBar');
        const searchTerm = searchBar.value.toLowerCase();

        const filteredIngredients = ingredientsData.filter(ingredient => 
            ingredient.name.toLowerCase().includes(searchTerm)
        );

        const filteredMeals = mealsData.filter(meal => 
            meal.name.toLowerCase().includes(searchTerm)
        );

        displayIngredients(filteredIngredients);
        displayMeals(filteredMeals);
    }

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', filterPantryItems);

  
     function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    function changePantryColors() {
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        const mealItems = document.querySelectorAll('.meal-item');

        ingredientItems.forEach(item => {
            item.style.backgroundColor = getRandomColor();
        });

        mealItems.forEach(item => {
            item.style.backgroundColor = getRandomColor();
        });
    }

    const changeColorButton = document.getElementById('change-color-btn');
    changeColorButton.addEventListener('click', changePantryColors);

    fetchPantryData(); 
});

