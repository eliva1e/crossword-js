import { Word } from './word';

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

  findWordObject(word) {
    return this.words.find((w) => w.word === word);
  }

  getDescription(word) {
    return this.findWordObject(word).description;
  }

  updateDescription(word, description) {
    const wordObj = this.findWordObject(word);
    wordObj.description = description;
    this.onChange();
  }
}
