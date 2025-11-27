import { renderCrosswordGrid, renderCrosswordPopup, renderDescriptionEdit, renderWordInput, renderWordList } from './renderers';
import { WordList } from './wordlist';
import { Crossword } from './crossword';
import '@fontsource-variable/inter';
import './style.css';

const root = document.querySelector('#app');
root.innerHTML = `
  <div id="word-list"></div>
  <div id="word-input"></div>
  <div id="crossword-grid"></div>
  <div id="crossword-popup"></div>
`;

// Word List
const wl = new WordList();

const wordList = root.querySelector('#word-list');
wordList.innerHTML = renderWordList(wl);

wl.onChange = () => {
  wordList.innerHTML = renderWordList(wl);
};

wordList.onclick = (e) => {
  if (e.target.classList.contains('remove-word-btn')) {
    const word = e.target.parentElement.querySelector('.word').innerText;
    wl.remove(word);
  } else if (e.target.classList.contains('description')) {
    const word = e.target.parentElement.querySelector('.word').innerText;
    e.target.innerHTML = renderDescriptionEdit();

    const form = e.target.querySelector('form');

    const newDescription = form.querySelector('.description-field');
    newDescription.value = wl.getDescription(word);

    form.onsubmit = (e) => {
      e.preventDefault();

      const newDescription = form.querySelector('.description-field');
      if (newDescription.value !== '') {
        wl.updateDescription(word, newDescription.value);
      }
    };
  }
};

wl.add('класс', 'описание того, как должен работать объект');
wl.add('объект', 'часть программы, которая, в теории, должна уметь работать самостоятельно');
wl.add('функция', 'блок кода, выполняющий определенную задачу');
wl.add('алгоритм', 'последовательность шагов для решения задачи');

// Word Input
const wordInput = root.querySelector('#word-input');
wordInput.innerHTML = renderWordInput();

const wordInputForm = wordInput.querySelector('#word-input-form');
wordInputForm.onsubmit = (e) => {
  e.preventDefault();

  const wordField = wordInputForm.querySelector('#word-field');
  const descriptionField = wordInputForm.querySelector('#description-field');

  if (wordField.value && descriptionField.value) {
    wl.add(wordField.value, descriptionField.value);

    wordField.value = '';
    descriptionField.value = '';
  }
};

// Crossword
const crossword = new Crossword();

const crosswordGrid = root.querySelector('#crossword-grid');
crosswordGrid.innerHTML = renderCrosswordGrid(crossword);

crossword.onChange = () => {
  crosswordGrid.innerHTML = renderCrosswordGrid(crossword);
};

crosswordGrid.onclick = (e) => {
  const { x, y } = e.target.dataset;

  crossword.selectCell(parseInt(x), parseInt(y));
  crosswordPopup.style.display = 'block';

  const wordField = document.querySelector('#crossword-popup-add-field');
  const horizontalWord = crossword.getWord(crossword.selectedCell.x, crossword.selectedCell.y, 'horizontal');

  if (horizontalWord) {
    wordField.value = horizontalWord;
  } else {
    const verticalWord = crossword.getWord(crossword.selectedCell.x, crossword.selectedCell.y, 'vertical');
    if (verticalWord) {
      wordField.value = verticalWord;
    } else {
      wordField.value = '';
    }
  }
};

// Crossword Popup
const crosswordPopup = root.querySelector('#crossword-popup');
crosswordPopup.innerHTML = renderCrosswordPopup();

const crosswordPopupClose = crosswordPopup.querySelector('#crossword-popup-close');
crosswordPopupClose.onclick = () => {
  crosswordPopup.style.display = 'none';
};

const crosswordPopupAddForm = crosswordPopup.querySelector('#crossword-popup-add-form');
crosswordPopupAddForm.onsubmit = (e) => {
  e.preventDefault();

  const addField = crosswordPopupAddForm.querySelector('#crossword-popup-add-field');
  const wordToAdd = addField.value;

  const direction = crosswordPopupAddForm.querySelector('#crossword-popup-direction-field').value;

  if (wordToAdd) {
    try {
      crossword.placeWord(wordToAdd, crossword.selectedCell.x, crossword.selectedCell.y, direction);
    } catch (err) {
      alert(err.message);
      return;
    }

    addField.value = '';
    crosswordPopup.style.display = 'none';
  }
};
