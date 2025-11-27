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

  if (!wordField.value) {
    alert('Enter word!');
    return;
  }

  if (!descriptionField.value) {
    alert('Enter description!');
    return;
  }

  wl.add(wordField.value, descriptionField.value);

  wordField.value = '';
  descriptionField.value = '';
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

  const horizontalField = document.querySelector('#crossword-popup-horizontal-field');
  const verticalField = document.querySelector('#crossword-popup-vertical-field');

  const horizontalWord = crossword.getWord(crossword.selectedCell.x, crossword.selectedCell.y, 'horizontal');
  if (horizontalWord) {
    horizontalField.value = horizontalWord;
  } else {
    horizontalField.value = '';
  }

  const verticalWord = crossword.getWord(crossword.selectedCell.x, crossword.selectedCell.y, 'vertical');
  if (verticalWord) {
    verticalField.value = verticalWord;
  } else {
    horizontalField.value = '';
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

  const horizontalWord = crosswordPopupAddForm.querySelector('#crossword-popup-horizontal-field');
  const horizontalWordToAdd = horizontalWord.value;

  const verticalWord = crosswordPopupAddForm.querySelector('#crossword-popup-vertical-field');
  const verticalWordToAdd = verticalWord.value;

  if (!horizontalWordToAdd && !verticalWordToAdd) {
    alert('Enter at least one word!');
    return;
  }

  try {
    if (horizontalWordToAdd) {
      crossword.placeWord(horizontalWordToAdd, crossword.selectedCell.x, crossword.selectedCell.y, 'horizontal');
      horizontalWord.value = '';
      crosswordPopup.style.display = 'none';
    }

    if (verticalWordToAdd) {
      crossword.placeWord(verticalWordToAdd, crossword.selectedCell.x, crossword.selectedCell.y, 'vertical');
      verticalWord.value = '';
      crosswordPopup.style.display = 'none';
    }
  } catch (err) {
    alert(err.message);
    return;
  }
};
