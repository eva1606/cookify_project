document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("filter-form");
    const selects = form ? form.querySelectorAll("select") : [];
    const okButton = form ? form.querySelector("#ok-button") : null;
    const sortMenu = document.getElementById("sortMenu");
    const filterPanel = document.getElementById("filterPanel");
    const searchBar = document.getElementById('searchBar');
    const recipeContainer = document.getElementById('recipe-container');
    const timeToCookSelect = document.getElementById('time-to-cook');
    const difficultySelect = document.getElementById('level');
    const conservationSelect = document.getElementById('conservation');
    let recipes = [];
    
    function fetchRecipes() {
      fetch('http://localhost:3064/api/recipes')
        .then(response => response.json())
        .then(data => {
          recipes = data;
          displayRecipes(recipes);
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    }
  
    function displayRecipes(recipes) {
      recipeContainer.innerHTML = '';
  
      recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');
  
        card.addEventListener('click', function() {
          window.location.href = `recipeDetails.html?id=${recipe.id}`; 
        });
  
        const img = document.createElement('img');
        img.src = recipe.image_url;
        img.alt = recipe.title;
  
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
  
        const title = document.createElement('h3');
        title.textContent = recipe.title;
  
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
        // Ajouter l'icône "More" et le menu déroulant
      const moreIcon = document.createElement('div');
      moreIcon.classList.add('more-icon');
      moreIcon.innerHTML = '<i class="fas fa-ellipsis-v"></i>';
      
      const dropdownMenu = document.createElement('div');
      dropdownMenu.classList.add('dropdown-menu');
      dropdownMenu.innerHTML = `
        <a href="mealplan.html">Add Meal Plan</a>
        <a href="lasagnerecipes.html">View My Recipes</a>
      `;
      
      moreIcon.appendChild(dropdownMenu);
      moreIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });
  
        cardContent.appendChild(title);
        cardContent.appendChild(details);
        card.appendChild(img);
        card.appendChild(cardContent);
        card.appendChild(moreIcon);
  
        recipeContainer.appendChild(card);
      });
    }
  
    function sortRecipes(criteria) {
      recipes.sort((a, b) => {
        if (criteria === 'name') {
          return a.title.localeCompare(b.title);
        } else if (criteria === 'level') {
          const levels = ['easy', 'medium', 'hard'];
          return levels.indexOf(a.difficulty.toLowerCase()) - levels.indexOf(b.difficulty.toLowerCase());
        } else if (criteria === 'conservation') {
          const getDays = str => parseInt(str.match(/\d+/)) || 0;
          return getDays(a.conservation) - getDays(b.conservation);
        } else if (criteria === 'time') {
          const getMinutes = str => parseInt(str.match(/\d+/)) || 0;
          return getMinutes(a.time) - getMinutes(b.time);
        }
      });
  
      displayRecipes(recipes);
    }
  
    if (sortMenu) {
      sortMenu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
          event.preventDefault();
          const criteria = event.target.dataset.criteria;
          sortRecipes(criteria);
        }
      });
    }
  
    window.toggleSortMenu = function() {
      sortMenu.classList.toggle("show");
    }
  
    function filterRecipes() {
      const searchQuery = searchBar ? searchBar.value.toLowerCase() : '';
      const timeToCook = timeToCookSelect ? timeToCookSelect.value.toLowerCase() : '';
      const difficulty = difficultySelect ? difficultySelect.value.toLowerCase() : '';
      const conservation = conservationSelect ? conservationSelect.value.toLowerCase() : '';
  
      const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
        const matchesTime = timeToCook ? recipe.time.toLowerCase().includes(timeToCook) : true;
        const matchesDifficulty = difficulty ? recipe.difficulty.toLowerCase() === difficulty : true;
        const matchesConservation = conservation ? recipe.conservation.toLowerCase().includes(conservation) : true;
  
        return matchesSearch && matchesTime && matchesDifficulty && matchesConservation;
      });
  
      displayRecipes(filteredRecipes);
    }
  
    if (searchBar) {
      searchBar.addEventListener('input', filterRecipes);
    }
    
    selects.forEach(select => {
      select.addEventListener('change', function() {
        const anyFilterSelected = Array.from(selects).some(select => select.value !== "");
        if (okButton) okButton.disabled = !anyFilterSelected;
      });
    });
  
    if (okButton) {
      okButton.addEventListener('click', function(event) {
        event.preventDefault();
        filterRecipes();
      });
    }
  
    function handleScreenChange(event) {
      if (event.matches) {
        form.addEventListener("change", handleFormChange);
      } else {
        form.removeEventListener("change", handleFormChange);
        if (okButton) okButton.disabled = true;
        if (sortMenu) sortMenu.classList.remove("show");
        if (filterPanel) filterPanel.classList.remove("show");
      }
    }
  
    function handleFormChange() {
      const anyFilterSelected = Array.from(selects).some(select => select.value !== "");
      if (okButton) okButton.disabled = !anyFilterSelected;
    }
  
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handleScreenChange);
    handleScreenChange(mediaQuery); 
  
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
  
    fetchRecipes();
  });
  