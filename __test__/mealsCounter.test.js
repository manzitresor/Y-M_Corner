// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import mealcardCounter from '../src/modules/mealCounter';

describe('mealcardsCounter', () => {
  const dom = new JSDOM();
  global.document = dom.window.document;
  test('count total mealscard', () => {
    const meals = ['Buffer', 'chicken', 'goat'];
    const totalmeal = document.createElement('span');
    mealcardCounter(totalmeal, meals);
    expect(totalmeal.textContent).toBe(`(${meals.length})`);
  });
});