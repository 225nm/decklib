export class Shuffler {
  /**
   * Returns a shuffled copy of the supplied deck using the Fisher-Yates algorithm.
   * @param {Card[]} deck The cards to shuffle.
   * @returns {Card[]} A new shuffled array.
   */
  shuffle(deck) {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  }
}