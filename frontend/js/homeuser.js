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
  
    getmyreceipts();
  });
  