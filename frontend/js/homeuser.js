document.addEventListener("DOMContentLoaded", function() {
    const recipeContainer = document.getElementById('recipeCarousel');
    const trendingRecipeContainer = document.getElementById('trendingRecipeCarousel');
    let forYouRecipes = [];
    let trendingRecipes = [];
    let currentIndex = 0;
    let currentTrendingIndex = 0;
    const cardsPerView = 3;
  
    const getmyreceipts = () => {
      Promise.all([
        fetch('http://localhost:3000/api/recipes-foryou').then(response => response.json()),
        fetch('http://localhost:3000/api/recipes-trendingnow').then(response => response.json())
      ])
      .then(([recipesForYou, trendingRecipes]) => {
        forYouRecipes = recipesForYou;
        trendingRecipes = trendingRecipes;
        displayRecipes(forYouRecipes, recipeContainer, currentIndex);
        displayRecipes(trendingRecipes, trendingRecipeContainer, currentTrendingIndex);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    };
  
  function displayRecipes(recipes, container, startIndex) {
    container.innerHTML = '';
    const endIndex = startIndex + cardsPerView;
    const visibleRecipes = recipes.slice(startIndex, endIndex);

    visibleRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = recipe.image;
      img.alt = recipe.name;

      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content');

      const title = document.createElement('h3');
      title.textContent = recipe.name;

      const details = document.createElement('div');
      details.classList.add('details');

      const timeDetail = document.createElement('p');
      timeDetail.innerHTML = `<i class="far fa-clock"></i> ${recipe.time}`;
      details.appendChild(timeDetail);

      const difficultyDetail = document.createElement('p');
      difficultyDetail.innerHTML = `<i class="fas fa-signal"></i> ${recipe.difficulty}`;
      details.appendChild(difficultyDetail);

      const conservationDetail = document.createElement('p');
      conservationDetail.innerHTML = `<i class="fas fa-box"></i> Conserved ${recipe.conservation}`;
      details.appendChild(conservationDetail);

      cardContent.appendChild(title);
      cardContent.appendChild(details);
      card.appendChild(img);
      card.appendChild(cardContent);

      container.appendChild(card);
    });

    updateButtons(recipes, container);
  }

  getmyreceipts();
});

  
  
 