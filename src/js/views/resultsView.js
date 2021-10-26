import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipies found for your query! Please try again!';
  _sucessMessage = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
};

export default new resultsView();