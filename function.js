const createFoodCard = (meal) => {
    let foodCard = document.createElement('div');
    foodCard.innerHTML = `
    <div class= 'card'>
    <img class= 'card-img-top' src= "${meal.strMealThumb}">
    <div class= 'card-body'>
    <h5 class= 'col'>${meal.strMeal}</h5>
    <h6 class= 'col text-success'>${meal.strArea}</h6>
    <a href="#" style = "text-decoration: none; color: purple;" onclick = loadModal(${meal.idMeal}) data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Details</a>
    </div>
    </div>
    `;
    return foodCard;
}