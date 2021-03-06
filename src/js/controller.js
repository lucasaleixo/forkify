import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js'; 
import paginationView from './views/paginationView.js'; 
import bookmarksView from './views/bookmarksView.js'; 

import 'core-js/stable';
import 'regenerator-runtime/runtime';

/*
if(module.hot) {
  module.hot.accept();
}
*/

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return; 
    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    // Get search query
    const query = searchView.getQuery();
    if(!query) return;

    resultsView.renderSpinner();

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagintaion buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}; 

const controlPagination = function(goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagintaion buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update servings and ingredients
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  // Add or remove bookmark
  if( !model.state.recipe.bookmarked ) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update the recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHadlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}; init();