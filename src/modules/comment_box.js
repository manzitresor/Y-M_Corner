import Request from './api_request.js';
import { InvolvementAPI, InvolvementToken } from './config.js';

class CommentBox {
    onLoad = async (itemId) => {
      try {
        return new Request()
          .get(`${InvolvementAPI}${InvolvementToken}/comments?item_id=${itemId}`);
      } catch (e) {
        return [];
      }
    }
}
export default CommentBox;