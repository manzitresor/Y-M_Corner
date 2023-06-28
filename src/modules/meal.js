import { Modal } from '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { toString, toJson } from './converter.js';
// import { Modal } from 'bootstrap';
import { ServerURL } from './config.js';

class Meal {
  constructor() {
    this.mainContainer = document.querySelector('.main-container');
    this.commentModal = document.getElementById('mealComment');
  }

  loadFromServer = async () => {
    const response = await fetch(ServerURL);
    const data = await response.json();
    return data.categories;
  };

  loadContent = async () => {
    const meals = await this.loadFromServer();
    let episodes = '';
    meals.forEach((res) => {
      episodes += `
      <div class="col-md-3">
        <div class="meals-container">
        <img src='${res.strCategoryThumb}' class='image'>
        <div class="like-container">
        <p class='meals'>Meal: ${res.strCategory}</p>
        <i class="far fa-heart like"></i>
        </div>
        <a href='#' class="comment comment-modal-btn" data-meal='${toString(res)}'>Comments</a>
        <a href='#' class='reservation'>Reservations</a>
        </div>
        </div>
        `;
    });
    this.mainContainer.innerHTML = episodes;
    this.listener();
  };

  listener = () => {
    const commentModalBtn = document.querySelectorAll('.comment-modal-btn');
    commentModalBtn.forEach((c) => c.addEventListener('click', (e) => {
      const meal = toJson(e.target.getAttribute('data-meal'));
      const modalImage = document.getElementById('modalImage');
      const modalTitle = document.getElementById('modalTitle');
      const modalDesc = document.getElementById('modalDesc');

      modalTitle.innerHTML = meal.strCategory;
      modalDesc.innerHTML = meal.strCategoryDescription;
      modalImage.src = meal.strCategoryThumb;

      const myModal = new Modal(this.commentModal, { keyboard: false });
      myModal.show();
    }));
  };
}

export default Meal;
