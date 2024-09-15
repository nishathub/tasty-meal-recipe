// selecting search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', function () {
    // get the search key 
    const searchField = document.getElementById('search-input');
    const searchKey = searchField.value;
    loadLimitedMeal(searchKey); // call back function
})

// using try and catch in loadAllMeal function
const loadLimitedMeal = async (searchKey) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLimitedMeal(data.meals, searchKey);
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
let loadMealCount = 5;
const foodSection = document.getElementById('foodCollection');
const loadMoreButton = document.getElementById('loadMore-button');
const searchComment = document.getElementById('search-comment');
const displayLimitedMeal = (meals, searchKey) => { // UPDATE (two parameters)
    foodSection.innerHTML = '';
    if (!meals?.length) { // UPDATE
        searchComment.innerHTML = `
        <h2>Nothing matches with "${searchKey}"</h2>
        `;
        loadMoreButton.style.display = 'none';
        return;
    } else { // UPDATE
        searchComment.innerHTML = '';
        loadMoreButton.style.display = meals.length > loadMealCount ? 'inline-block' : 'none';
        for(let i = 0; i <= loadMealCount; i++){
            let meal = meals[i];
            const foodCard = createFoodCard(meal); // UPDATE
            foodCard.classList.add('col');
            foodCard.style = 'margin-bottom: 40px;';
            foodSection.appendChild(foodCard);
        };
    }
}


window.addEventListener('load',function(){
    loadLimitedMeal('');
})

// selecting LOAD MORE button
loadMoreButton.addEventListener('click', function () {
    // get the search key 
    const searchField = document.getElementById('search-input');
    const searchKey = searchField.value;
    loadAllMeal(searchKey); // call back function
})
// using try and catch in loadAllMeal function
const loadAllMeal = async (searchKey) => {
    console.log('loadAllMeal working');
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.meals[0]);
        displayAllMeal(data.meals);
    } catch (error) {
        console.log(error);
    }

}
// selecting Food collection section to show food items

const displayAllMeal = (meals) => {
    foodSection.innerHTML = '';
    document.getElementById('loadMore-button').style.display = 'none';
    meals.forEach(meal => {
        const foodCard = createFoodCard(meal); // UPDATE 
        foodCard.classList.add('col');
        foodSection.appendChild(foodCard);
    });
}