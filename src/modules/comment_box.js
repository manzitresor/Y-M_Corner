import Request from './api_request.js';
import { likeUrl, appId } from './config.js';

class CommentBox {
  onLoad = async (itemId) => {
    const commentList = document.getElementById('comment-list');
    let comments = await new Request().get(`${likeUrl}/${appId}/comments?item_id=${itemId}`);

    if (comments.error) {
      comments = [];
    }
    if (comments.length === 0) {
      commentList.innerHTML = '<li>No comment</li>';
    } else {
      commentList.innerHTML = comments
        .map((com) => `
      <li>
          <p>${com.creation_date} ${com.username}: ${com.comment}</p>
      </li>`)
        .join('');
    }
  };

  onSubmit = async (data) => {
    await new Request().post(`${likeUrl}/${appId}/comments`, data);
  }
}
export default CommentBox;
