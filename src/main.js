import { renderWordInput, renderWordList } from './renderers';
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
  const removeWordButtons = document.querySelectorAll('.remove-word-btn');
  for (const btn of removeWordButtons) {
    btn.addEventListener('click', (e) => {
      const word = e.target.parentElement.querySelector('.word').innerText;
      wl.remove(word);
    });
  }
};

wl.add('класс', 'описание того, как должен работать объект');
wl.add('объект', 'часть программы, которая, в теории, должна уметь работать самостоятельно');
wl.add('функция', 'блок кода, выполняющий определенную задачу');
wl.add('алгоритм', 'последовательность шагов для решения задачи');

const wordInput = root.querySelector('#word-input');
wordInput.innerHTML = renderWordInput();


