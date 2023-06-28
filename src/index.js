import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Meal from './modules/meal.js';

const meal = new Meal();
meal.loadContent();