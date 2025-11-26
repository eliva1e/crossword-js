export class Crossword {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));
    this.selectedCell = null;
    this.onChange = () => null;
  }

  placeWord(word, x, y, direction) {
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
}
