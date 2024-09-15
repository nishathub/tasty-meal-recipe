// selecting search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', function () {
    // get the search key 
    const searchField = document.getElementById('search-input');
    const searchKey = searchField.value;
    loadLimitedMeal(searchKey); // call back function
})

// using try and catch in loadMeal function
const loadLimitedMeal = async (searchKey) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLimitedMeal(data.meals);
    } catch (error) {
        console.log(error);
    }

}
// Modal part
const loadModal = async (mealId) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const res = await fetch(url);
        const data = await res.json();
        displayModal(data.meals[0]);
    } catch (error) {
        console.log(error);
    }
}
const displayModal = (meal) => {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    modalTitle.innerText = meal.strMeal;
    modalBody.innerHTML = `
    <img class = 'img-fluid' src = '${meal.strMealThumb}'>
    <h6>Ingredients : ${meal.strIngredient1}, ${meal.strIngredient2}, ${meal.strIngredient3}, ${meal.strIngredient4}, ${meal.strIngredient5}, etc.</h6>
    <p>Region : ${meal.strArea}</p>
    <p>Category : ${meal.strCategory}</p>
    <a style = "text-decoration: none;" href = '${meal.strYoutube}'>Watch in Youtube</a>
    `
}

const displayLimitedMeal = (meals) => {
    foodSection.innerHTML = '';
    const loadMoreButton = document.getElementById('loadMore-button');
    loadMoreButton.style.display = 'block';
    for(let i = 0; i <= 5; i++){
        let meal = meals[i];
        const foodCard = document.createElement('div');
        foodCard.classList.add('col');
        foodCard.style = 'margin-bottom: 40px;';
        foodCard.innerHTML = `
        <div class= 'card'>
            <img class= 'card-img-top' src= "${meal.strMealThumb}">
            <div class= 'card-body'>
            <h5 class= 'col'>${meal.strMeal}</h5>
            <h6 class= 'col text-success'>${meal.strArea}</h6>
            <a href="#" style = "text-decoration: none; color: purple;" onclick = loadModal(${meal.idMeal}) data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</a>
            </div>
        </div>
        `
        foodSection.appendChild(foodCard);
    };
}

window.addEventListener('load',function(){
    loadLimitedMeal('');
})

// selecting LOAD MORE button
const loadMoreButton = document.getElementById('loadMore-button');
loadMoreButton.addEventListener('click', function () {
    // get the search key 
    const searchField = document.getElementById('search-input');
    const searchKey = searchField.value;
    loadMeal(searchKey); // call back function
})
// using try and catch in loadMeal function
const loadMeal = async (searchKey) => {
    console.log('loadMeal working');
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.meals[0]);
        displayMeal(data.meals);
    } catch (error) {
        console.log(error);
    }

}
// selecting Food collection section to show food items
const foodSection = document.getElementById('foodCollection');
const displayMeal = (meals) => {
    foodSection.innerHTML = '';
    document.getElementById('loadMore-button').style.display = 'none';
    meals.forEach(meal => {
        const foodCard = document.createElement('div');
        foodCard.classList.add('col');
        foodCard.innerHTML = `
        <div class= 'card'>
            <img class= 'card-img-top' src= "${meal.strMealThumb}">
            <div class= 'card-body'>
            <h5 class= 'col'>${meal.strMeal}</h5>
            <h6 class= 'col text-success'>${meal.strArea}</h6>
            <a href="#" style = "text-decoration: none; color: purple;" onclick = loadModal(${meal.idMeal}) data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</a>
            </div>
        </div>
        `
        foodSection.appendChild(foodCard);
    });
}