document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    let ingredientsArray = [];

    console.log("DOM fully loaded and parsed.");

    const chefId = localStorage.getItem('chefId');
    if (chefId) {
        document.getElementById('chef_id').value = chefId;
        console.log("Chef ID set:", chefId);
    } else {
        console.error("Chef ID not found in localStorage");
    }

    const editRecipe = JSON.parse(localStorage.getItem('editRecipe'));
    if (editRecipe) {
        document.getElementById('chef_id').value = editRecipe.chef_id;
        document.getElementById('title').value = editRecipe.title;
        document.getElementById('instructions').value = editRecipe.instructions;
        document.getElementById('time').value = editRecipe.time;
        document.getElementById('conservation').value = editRecipe.conservation;
        document.getElementById('difficulty').value = editRecipe.difficulty;
        document.getElementById('prepTime').value = editRecipe.prepTime;
        document.getElementById('cookTime').value = editRecipe.cookTime;
        editRecipe.ingredients.forEach(ingredient => addIngredient(ingredient));
        localStorage.removeItem('editRecipe');
        console.log("Editing recipe:", editRecipe);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const chefId = document.getElementById('chef_id').value;
        const title = document.getElementById('title').value;
        const instructions = document.getElementById('instructions').value;
        const imageFile = document.getElementById('image_url').files[0];
        const time = document.getElementById('time').value;
        const conservation = document.getElementById('conservation').value;
        const difficulty = document.getElementById('difficulty').value;
        const prepTime = document.getElementById('prepTime').value;
        const cookTime = document.getElementById('cookTime').value;

        const ingredients = [];
        document.querySelectorAll('.ingredient-item').forEach(item => {
            const name = item.querySelector('input[name="name"]').value;
            const quantity = item.querySelector('input[name="quantity"]').value;
            const unit = item.querySelector('input[name="unit"]').value;
            ingredients.push({ name, quantity, unit });
        });

        if (!chefId || !title || !instructions || !time || !conservation || !difficulty || ingredients.length === 0 || !prepTime || !cookTime) {
            console.error('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('chef_id', chefId);
        formData.append('title', title);
        formData.append('instructions', instructions);
        formData.append('image_url', imageFile || '');
        formData.append('time', time);
        formData.append('conservation', conservation);
        formData.append('difficulty', difficulty);
        formData.append('prepTime', prepTime);
        formData.append('cookTime', cookTime);
        formData.append('ingredients', JSON.stringify(ingredients));

        let url = '/api/recipes';
        let method = 'POST';

        if (editRecipe) {
            url = `/api/recipes/${editRecipe.id}`;
            method = 'PUT';
        }

        console.log('Submitting form data to:', url);
        console.log('Method:', method);
        console.log('FormData:', formData);

        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
            } else {
                console.log('Success:', data);
                window.location.href = 'chefpage.html';
            }
        })
        .catch(error => console.error('Error:', error));
    });

    window.addIngredient = function (ingredient = {}) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('ingredient-item');

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.placeholder = "Nom de l'ingrédient";
        nameInput.value = ingredient.name || '';
        nameInput.required = true;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.name = 'quantity';
        quantityInput.placeholder = 'Quantité';
        quantityInput.value = ingredient.quantity || '';
        quantityInput.required = true;

        const unitInput = document.createElement('input');
        unitInput.type = 'text';
        unitInput.name = 'unit';
        unitInput.placeholder = 'Unité';
        unitInput.value = ingredient.unit || '';
        unitInput.required = true;

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Supprimer';
        removeButton.onclick = function () {
            itemDiv.remove();
        };

        itemDiv.appendChild(nameInput);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(unitInput);
        itemDiv.appendChild(removeButton);
        ingredientList.appendChild(itemDiv);
    };

    window.removeIngredient = function (button) {
        button.parentElement.remove();
    };
});
