export class Crossword {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));
    this.selectedCell = null;
    this.onChange = () => null;
  }

  placeWord(word, x, y, direction) {
    if (direction === 'horizontal' && y + word.length > 10) {
      throw new Error('Word does not fit horizontally');
    } else if (direction === 'vertical' && x + word.length > 10) {
      throw new Error('Word does not fit vertically');
    }

    for (const letter of word) {
      this.grid[x][y] = letter;

      if (direction === 'horizontal') {
        y += 1;
      } else if (direction === 'vertical') {
        x += 1;
      }
    }

    this.onChange();
  }

  selectCell(x, y) {
    this.selectedCell = { x, y };
  }

  getWord(x, y, direction) {
    let word = '';

    while (true) {
      const letter = this.grid[x][y];
      if (letter === undefined || letter === ' ') {
        break;
      }

      if (direction === 'horizontal') {
        y += 1;
      } else if (direction === 'vertical') {
        x += 1;
      }

      word += letter;
    }

    return word;
  }
}
