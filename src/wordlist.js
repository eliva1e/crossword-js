import { Word } from "./word";

export class WordList {
  constructor() {
    this.words = [];
    this.onChange = () => null;
  }

  add(word, description) {
    this.words.push(new Word(word, description));
    this.onChange();
  }

  remove(word) {
    this.words = this.words.filter((w) => w.word !== word);
    this.onChange();
  }
}
