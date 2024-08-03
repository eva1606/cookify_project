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


  function updateButtons(recipes, container) {
    const isForYouRecipes = container === recipeContainer;
    const index = isForYouRecipes ? currentIndex : currentTrendingIndex;
    const leftButton = isForYouRecipes ? document.getElementById('leftBtn') : document.getElementById('trendingLeftBtn');
    const rightButton = isForYouRecipes ? document.getElementById('rightBtn') : document.getElementById('trendingRightBtn');

    leftButton.disabled = index === 0;
    rightButton.disabled = index + cardsPerView >= recipes.length;
  }

  document.getElementById('leftBtn').addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex -= cardsPerView;
      displayRecipes(forYouRecipes, recipeContainer, currentIndex);
    }
  });

  document.getElementById('rightBtn').addEventListener('click', function() {
    if (currentIndex + cardsPerView < forYouRecipes.length) {
      currentIndex += cardsPerView;
      displayRecipes(forYouRecipes, recipeContainer, currentIndex);
    }
  });

  document.getElementById('trendingLeftBtn').addEventListener('click', function() {
    if (currentTrendingIndex > 0) {
      currentTrendingIndex -= cardsPerView;
      displayRecipes(trendingRecipes, trendingRecipeContainer, currentTrendingIndex);
    }
  });

  document.getElementById('trendingRightBtn').addEventListener('click', function() {
    if (currentTrendingIndex + cardsPerView < trendingRecipes.length) {
      currentTrendingIndex += cardsPerView;
      displayRecipes(trendingRecipes, trendingRecipeContainer, currentTrendingIndex);
    }
  });

  document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredForYou = forYouRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
    const filteredTrending = trendingRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm));
    displayRecipes(filteredForYou, recipeContainer, 0);
    displayRecipes(filteredTrending, trendingRecipeContainer, 0);
  });

  document.getElementById('sortMenu').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const criteria = event.target.dataset.criteria;
      sortRecipes(forYouRecipes, criteria);
      sortRecipes(trendingRecipes, criteria);
      displayRecipes(forYouRecipes, recipeContainer, currentIndex);
      displayRecipes(trendingRecipeContainer, currentTrendingIndex);
    }
  });

  function sortRecipes(recipes, criteria) {
    if (criteria === 'name') {
      recipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'level') {
      const levels = ['easy', 'medium', 'hard'];
      recipes.sort((a, b) => levels.indexOf(a.difficulty.toLowerCase()) - levels.indexOf(b.difficulty.toLowerCase()));
    } else if (criteria === 'conservation') {
      recipes.sort((a, b) => {
        const getDays = str => parseInt(str.match(/\d+/)) || 0;
        return getDays(a.conservation) - getDays(b.conservation);
      });
    }
  }

  document.getElementById('sort-options').addEventListener('change', function() {
    const sortValue = sortSelect.value;
    if (sortValue === 'name') {
      forYouRecipes.sort((a, b) => a.name.localeCompare(b.name));
      trendingRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'difficulty') {
      forYouRecipes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
      trendingRecipes.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
    } else if (sortValue === 'time') {
      forYouRecipes.sort((a, b) => parseInt(a.time) - parseInt(b.time));
      trendingRecipes.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    }
    displayRecipes(forYouRecipes, recipeContainer, currentIndex);
    displayRecipes(trendingRecipeContainer, currentTrendingIndex);
  });

  window.toggleFilterPanel = function() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      filterPanel.classList.toggle("show");
    } else {
      filterPanel.classList.remove("show");
    }
  }

  document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'login.html'; 
  });

  window.toggleSortMenu = function() {
    sortMenu.classList.toggle("show");
  }

  getmyreceipts();
});


 
 
  
