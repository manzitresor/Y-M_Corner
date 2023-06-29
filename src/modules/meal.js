import { Modal } from '../../node_modules/bootstrap/dist/js/bootstrap.js';
import { toString, toJson } from './converter.js';
import mealcardCounter from './mealCounter.js';
import { ServerURL, appId, likeUrl } from './config.js';
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
    meals.forEach((res, id) => {
      episodes += `
      <div class="col-md-3">
        <div class="meals-container">
        <img src='${res.strCategoryThumb}' class='image'>
        <div class="like-container">
        <p class='meals'>Meal: ${res.strCategory}</p>
        <i class="far fa-heart likebtn" id="${id}"></i>
        <span class="showLikes" id="${id}"></span>
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
    this.modalCommentForm();
    const showLikes = document.querySelectorAll('.showLikes');
    const likebtns = document.querySelectorAll('.likebtn');
    likebtns.forEach((likebtn) => this.createLike(likebtn, showLikes));
    this.showLike(showLikes);
    mealcardCounter(this.totalMeals, this.mealsArry);
  };

  getLike = async () => {
    const likeApi = await fetch(`${likeUrl}/${appId}/likes`);
    const res = await likeApi.json();
    return res;
  }

  showLike = async (showLikes) => {
    const likesNumbers = await this.getLike();
    likesNumbers.forEach((likenumber) => {
      showLikes.forEach((showlike) => {
        if (likenumber.item_id === showlike.id) {
          showlike.textContent = `${likenumber.likes}Likes`;
        }
      });
    });
  }

  createLike = async (likebtn, showLikes) => {
    likebtn.addEventListener('click', async (e) => {
      const { id } = e.target;
      const likeApi = await fetch(`${likeUrl}/${appId}/likes/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          item_id: id,
        }),
      });
      await likeApi.text();
      this.showLike(showLikes);
    });
  }

  listener = () => {
    const comment = new CommentBox();
    const commentModalBtn = document.querySelectorAll('.comment-modal-btn');
    commentModalBtn.forEach((c) => c.addEventListener('click', async (e) => {
      const meal = toJson(e.target.getAttribute('data-meal'));

      if (meal) {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalCommentId = document.getElementById('modalCommentId');

        modalTitle.innerHTML = meal.strCategory;
        modalDesc.innerHTML = meal.strCategoryDescription;
        modalImage.src = meal.strCategoryThumb;
        modalCommentId.value = meal.idCategory;

        await comment.onLoad(meal.idCategory);
      }
      const myModal = new Modal(this.commentModal, { keyboard: false });
      myModal.show();
    }));
  };

  modalCommentForm = () => {
    const comment = new CommentBox();
    const modalCommentButton = document.getElementById('modalCommentButton');
    modalCommentButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const itemId = document.getElementById('modalCommentId');
      const itemUsername = document.getElementById('modalCommentName');
      const itemComment = document.getElementById('modalCommentContent');

      await comment.onSubmit({
        item_id: itemId.value,
        username: itemUsername.value,
        comment: itemComment.value,
      });
      await comment.onLoad(itemId.value);
      itemUsername.value = '';
      itemComment.value = '';
    });
  }
}

export default Meal;
