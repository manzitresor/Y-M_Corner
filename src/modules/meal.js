import { Modal } from '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { toString, toJson } from './converter.js';
import { ServerURL } from './config.js';
import Request from './api_request.js';
import CommentBox from './comment_box.js';

class Meal {
  constructor() {
    this.mainContainer = document.querySelector('.main-container');
    this.commentModal = document.getElementById('mealComment');
  }

  loadFromServer = async () => {
    const request = new Request();
    const response = await request.get(ServerURL);
    return response.categories;
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
        <a href='#' class="comment comment-modal-btn" data-meal='${toString(
        res,
      )}'>Comments</a>
        <a href='#' class='reservation'>Reservations</a>
        </div>
        </div>
        `;
    });
    this.mainContainer.innerHTML = episodes;
    this.listener();
  };

  listener = () => {
    const comment = new CommentBox();

    const commentModalBtn = document.querySelectorAll('.comment-modal-btn');
    commentModalBtn.forEach((c) => c.addEventListener('click', async (e) => {
      const meal = toJson(e.target.getAttribute('data-meal'));
      const commentList = document.getElementById('comment-list');

      if (meal) {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');

        modalTitle.innerHTML = meal.strCategory;
        modalDesc.innerHTML = meal.strCategoryDescription;
        modalImage.src = meal.strCategoryThumb;

        const comments = await comment.onLoad(meal.idCategory);
        commentList.innerHTML = comments
          .map((com) => `
            <li>
                <p>${com.creation_date} ${com.username}: ${com.comment}</p>
            </li>`)
          .join('');
      }
      const myModal = new Modal(this.commentModal, { keyboard: false });
      myModal.show();
    }));
  };
}

export default Meal;
