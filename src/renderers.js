export function renderWordList(wl) {
  const tableTemplate = document.querySelector('#word-list-tpl').innerHTML;
  const rowTemplate = document.querySelector('#word-row-tpl').innerHTML;

  let rowsHtml = '';

  for (const { word, description } of wl.words) {
    rowsHtml += rowTemplate.replace('%word', word).replace('%description', description);
  }

  return tableTemplate.replace('<tr></tr>', rowsHtml);
}

export function renderWordInput() {
  return document.querySelector('#word-input-tpl').innerHTML;
}

export function renderDescriptionEdit() {
  return document.querySelector('#edit-description-tpl').innerHTML;
}

export function renderCrosswordPopup() {
  return document.querySelector('#crossword-popup-tpl').innerHTML;
}

export function renderCrosswordGrid(crossword) {
  const crosswordEl = document.createElement('div');

  for (let x = 0; x < 10; x++) {
    const row = document.createElement('div');
    row.classList.add('cell-row');

    for (let y = 0; y < 10; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = crossword.grid[x][y];

      cell.dataset.x = x;
      cell.dataset.y = y;

      row.appendChild(cell);
    }

    crosswordEl.appendChild(row);
  }

  return crosswordEl.innerHTML;
}
