import Request from './api_request.js';
import { likeUrl, appId } from './config.js';

class CommentBox {
  onLoad = async (itemId) => new Request().get(`${likeUrl}/${appId}/comments?item_id=${itemId}`);
}
export default CommentBox;
