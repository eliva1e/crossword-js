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
