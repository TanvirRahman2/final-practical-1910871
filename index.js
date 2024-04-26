const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', searchMeals);

function searchMeals() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    resultContainer.innerHTML = ''; // Clear previous results
    fetchMeals(searchTerm);
  }
}

function fetchMeals(searchTerm) {
  const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const meals = data.meals;
      if (meals) {
        displayMeals(meals);
      } else {
        resultContainer.innerHTML = '<p>No meals found.</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultContainer.innerHTML = '<p>An error occurred while fetching meals.</p>';
    });
}

function displayMeals(meals) {
  let mealCards = '';
  const maxResults = 5;

  for (let i = 0; i < Math.min(meals.length, maxResults); i++) {
    const meal = meals[i];
    mealCards += `
      <div class="meal-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.idMeal} - ${meal.strMeal}</h3>
        <p>${meal.strInstructions}</p>
      </div>
    `;
  }

  resultContainer.innerHTML = mealCards;

  if (meals.length > maxResults) {
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'Show All';
    showAllButton.classList.add('show-all-btn');
    showAllButton.addEventListener('click', () => displayMeals(meals));
    resultContainer.appendChild(showAllButton);
  }
}
