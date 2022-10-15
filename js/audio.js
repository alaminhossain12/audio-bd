const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  // console.log(meals);
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div onclick="loadMealDetails(${meal.idMeal})" class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
          ${meal.strInstructions.slice(0, 120)}
        </p>
      </div>
  </div>
    `;
    mealContainer.appendChild(mealDiv);
  });
};

const loadSearchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadMeals(searchText);
  searchField.value = "";
};

const loadMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => mealShowDetails(data.meals[0]));
};

const mealShowDetails = (meal) => {
  // console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.innerHTML = "";
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("card");
  mealDiv.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        ${meal.strInstructions.slice(0, 30)}
      </p>
      <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
  `;
  mealDetails.appendChild(mealDiv);
};

// loadMeals("");
