const mainContainer = document.querySelector('.main-container');

// eslint-disable-next-line import/prefer-default-export
export const getMealsData = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  const meals = await data.categories;
  let episodes = '';
  meals.forEach((res) => {
    episodes += `
      <div class="meals-container">
      <img src='${res.strCategoryThumb}' class='image'>
      <div class="like-container">
      <p class='meals'>Meal: ${res.strCategory}</p>
      <i class="far fa-heart like"></i>
      </div>
      <a href='#' class='comment'>Comments</a>
      </div>
      `;
  });
  mainContainer.innerHTML = episodes;

  const comments = document.querySelectorAll('.comment');
  comments.forEach((comment) => {
    comment.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('comment clicked');
    });
  });
};
