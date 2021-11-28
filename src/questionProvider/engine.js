export class QuestionProvider {
  constructor(deck) {
    this.deck = deck;
  }

  next() {
    return this.deck[Math.floor(Math.random() * this.deck.length)];
  }
}
