var express = require('express');
var router = express.Router();
var fs = require('fs');

const DATA_PATH = 'data/recipes.json';

/**
 *
 */
router.get('/', function (req, res, next) {
  console.log('reading file %o', DATA_PATH);
  const recipes = getRecipes();
  res.json(recipes);
});

/**
 *
 */
router.post('/create', function (req, res, next) {
  const { name, category, availability, eta, weight, price, ingredients, img } = req.body;
  const recipe = { name, category, availability, eta, weight, price, ingredients, img };

  recipe.id = Math.random().toString(36).substring(7) + new Date().getTime();

  const recipes = getRecipes();

  recipes.push(recipe);

  setRecipes(recipes);

  res.json({ success: true });
  res.status(201);
});

/**
 *
 */
router.delete('/delete', function (req, res, next) {
  const id = req.body.id;

  let recipes = getRecipes();
  recipes = recipes.filter(recipe => recipe.id !== id);

  setRecipes(recipes);

  res.json({ success: true });
});

/**
 *
 */
router.put('/update', function (req, res, next) {
  const { name, category, availability, eta, weight, price, ingredients, img, id } = req.body;

  const recipes = getRecipes();
  const recipe = recipes.find(recipe => recipe.id === id);
  if (name) recipe.name = name;
  if (category) recipe.category = category;
  if (availability !== undefined) recipe.availability = availability;
  if (weight) recipe.weight = weight;
  if (eta) recipe.eta = eta;
  if (price) recipe.price = price;
  if (ingredients) recipe.ingredients = ingredients;
  if (img) recipe.img = img;

  setRecipes(recipes);
  res.json({ success: true, avTest: availability });
});

function getRecipes() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setRecipes(recipes) {
  const content = JSON.stringify(recipes, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
