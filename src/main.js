import { renderDescriptionEdit, renderWordInput, renderWordList } from './renderers';
import { WordList } from './wordlist';
import '@fontsource-variable/inter';
import './style.css';

const root = document.querySelector('#app');
root.innerHTML = `
  <div id="word-list"></div>
  <div id="word-input"></div>
`;

const wl = new WordList();

const wordList = root.querySelector('#word-list');
wordList.innerHTML = renderWordList(wl);

wl.onChange = () => {
  wordList.innerHTML = renderWordList(wl);
};

wordList.addEventListener('click', (e) => {
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
});

wl.add('класс', 'описание того, как должен работать объект');
wl.add('объект', 'часть программы, которая, в теории, должна уметь работать самостоятельно');
wl.add('функция', 'блок кода, выполняющий определенную задачу');
wl.add('алгоритм', 'последовательность шагов для решения задачи');

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
