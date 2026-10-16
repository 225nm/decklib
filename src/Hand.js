import { Card } from "./Card.js";

export class Hand {
  #cards;

  constructor(cards = []) {
    this.#cards = [...cards];
  }

  /**
   * Adds one card or an array of cards to the hand.
   * @param {Card|Card[]} cards The card or cards to add.
   * @returns {void}
   */
  addCard(cards) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards);
    } else {
      this.#cards.push(cards);
    }
  }

  /**
   * Removes a matching card from the hand and returns it.
   * @param {Card} card The card to remove.
   * @returns {Card|undefined} The removed card, or undefined if not present.
   * @throws {TypeError} If the argument is not a Card instance.
   */
  removeCard(card) {
    if (!(card instanceof Card)) {
      throw new TypeError("Argument must be an instance of Card.");
    }
    const index = this.#cards.findIndex(
      (c) => c.getSuit() === card.getSuit() && c.getRank() === card.getRank(),
    );
    if (index !== -1) {
      return this.#cards.splice(index, 1)[0];
    }
  }

  /**
   * Returns the number of cards in the hand.
   * @returns {number} The hand size.
   */
  getHandSize() {
    return this.#cards.length;
  }

  /**
   * Returns a shallow copy of the cards currently in the hand.
   * @returns {Card[]} A copy of the hand contents.
   */
  getCards() {
    return [...this.#cards];
  }

  /**
   * Sorts the cards in ascending rank and suit order.
   * @returns {void}
   */
  sortByValue() {
    this.#cards.sort((a, b) => a.compareTo(b));
  }

  /**
   * Removes a card from the hand and adds it to the supplied discard pile.
   * @param {Card} card The card to play.
   * @param {DiscardPile} discardPile The pile to add the card to.
   * @returns {void}
   * @throws {Error} If the card is not in the hand.
   */
  playCard(card, discardPile) {
    const playedCard = this.removeCard(card);
    if (!playedCard) {
      throw new Error("Card not found in hand.");
    }
    discardPile.addCard(playedCard);
  }
}
