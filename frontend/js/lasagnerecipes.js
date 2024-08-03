document.addEventListener("DOMContentLoaded", function() {
    fetch('data/lasagnerecipes.json')
        .then(response => response.json())
        .then(data => {
            const recipe = data.recipes[0];

            const cardContainer = document.getElementById('cardrecipes-container');
            const cardHTML = `
                <div class="cardrecipes-container">
                    <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    <div class="card-footer">
                        <div class="card-footer-title">${recipe.title}</div>
                        <div class="card-footer-content">
                            <div class="card-footer-instructions">
                                <div>
                                    <p>Prep Time:</p>
                                    <p>${recipe.prepTime}</p>
                                </div>
                                <div>
                                    <p>Cook Time:</p>
                                    <p>${recipe.cookTime}</p>
                                </div>
                                <div>
                                    <p>Total Time:</p>
                                    <p>${recipe.totalTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML = cardHTML;

            const mainIngredientsList = document.getElementById('main-ingredients-list');
            recipe.mainIngredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.dataset.quantity = ingredient.quantity;
                listItem.dataset.unit = ingredient.unit;
                listItem.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                    <span class="ingredient-name">${ingredient.name}</span>
                    <span class="ingredient-quantity">${ingredient.quantity} ${ingredient.unit}</span>
                    <input type="checkbox" id="mainIngredient-${ingredient.id}" name="mainIngredient">
                `;
                mainIngredientsList.appendChild(listItem);
            });

            const bechamelIngredientsList = document.getElementById('bechamel-ingredients-list');
            recipe.bechamelIngredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.dataset.quantity = ingredient.quantity;
                listItem.dataset.unit = ingredient.unit;
                listItem.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}" class="ingredient-image">
                    <span class="ingredient-name">${ingredient.name}</span>
                    <span class="ingredient-quantity">${ingredient.quantity} ${ingredient.unit}</span>
                    <input type="checkbox" id="bechamelIngredient-${ingredient.id}" name="bechamelIngredient">
                `;
                bechamelIngredientsList.appendChild(listItem);
            });

            const slider = document.getElementById("myRange");
            const output = document.getElementById("demo");

            output.innerHTML = slider.value;

            slider.addEventListener('input', function() {
                output.innerHTML = this.value;
                updateIngredientQuantities(this.value);
            });

            function updateIngredientQuantities(numServings) {
                const mainIngredientsListItems = document.querySelectorAll('.main-ingredients-list li');
                const bechamelIngredientsListItems = document.querySelectorAll('.bechamel-ingredients-list li');

                mainIngredientsListItems.forEach(item => {
                    const quantity = parseFloat(item.dataset.quantity);
                    const updatedQuantity = quantity * numServings;
                    const unit = item.dataset.unit;
                    item.querySelector('.ingredient-quantity').textContent = `${formatQuantity(updatedQuantity)} ${unit}`;
                });

                bechamelIngredientsListItems.forEach(item => {
                    const quantity = parseFloat(item.dataset.quantity);
                    const updatedQuantity = quantity * numServings;
                    const unit = item.dataset.unit;
                    item.querySelector('.ingredient-quantity').textContent = `${formatQuantity(updatedQuantity)} ${unit}`;
                });
            }

            function formatQuantity(quantity) {
                return Number.isInteger(quantity) ? quantity.toFixed(0) : quantity.toFixed(2);
            }

            const addToPantryBtn = document.getElementById('addToPantryBtn');
            addToPantryBtn.disabled = true;

            document.querySelectorAll('.main-ingredients-list input[type="checkbox"], .bechamel-ingredients-list input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateAddToPantryBtnState);
            });

            function updateAddToPantryBtnState() {
                const anyCheckboxChecked = Array.from(document.querySelectorAll('.main-ingredients-list input[type="checkbox"], .bechamel-ingredients-list input[type="checkbox"]'))
                    .some(checkbox => checkbox.checked);

                addToPantryBtn.disabled = !anyCheckboxChecked;
                addToPantryBtn.classList.toggle('active', anyCheckboxChecked);
            }

            addToPantryBtn.addEventListener('click', function() {
                const mainIngredientsListItems = document.querySelectorAll('.main-ingredients-list li');
                const bechamelIngredientsListItems = document.querySelectorAll('.bechamel-ingredients-list li');
                const selectedIngredients = [];

                mainIngredientsListItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        const name = item.querySelector('.ingredient-name').innerText;
                        const quantity = item.querySelector('.ingredient-quantity').innerText;
                        const image = item.querySelector('img').src;
                        selectedIngredients.push({ name, quantity, image });
                    }
                });

                bechamelIngredientsListItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        const name = item.querySelector('.ingredient-name').innerText;
                        const quantity = item.querySelector('.ingredient-quantity').innerText;
                        const image = item.querySelector('img').src;
                        selectedIngredients.push({ name, quantity, image });
                    }
                });

                addToPantry(selectedIngredients);
            });

            function addToPantry(ingredients) {
                fetch('/api/pantry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ingredients })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Ingredients added to pantry:', data);
                    window.location.href = 'mypantry.html';
                })
                .catch(error => console.error('Error adding ingredients to pantry:', error));
            }
        })
        .catch(error => console.error('Error fetching recipe data:', error));
});
