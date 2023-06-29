// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import CommentBox from '../src/modules/comment_box.js';

describe('commentCounter', () => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  test('count total comments', () => {
    const commentBox = new CommentBox();
    const counter = ['It is me', 'Yes, love it', 'Thank you'];
    const commentDIV = document.createElement('span');
    commentBox.onCounter(commentDIV, counter.length);
    expect(commentDIV.textContent).toBe(`(${counter.length})`);
  });
});