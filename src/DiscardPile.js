import { Card } from './Card.js'

export class DiscardPile {
  #cards

  constructor(cards = []) {
    this.#cards = [...cards]
  }

  /**
   * Adds one card or an array of cards to the discard pile.
   * @param {Card|Card[]} cards The card or cards to add.
   * @returns {void}
   */
  addCard(cards) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards)
    } else {
      this.#cards.push(cards)
    }
  }

  /**
   * Returns a shallow copy of the cards currently in the pile.
   * @returns {Card[]} A copy of the discard pile contents.
   */
  getCards() {
    return [...this.#cards]
  }

  /**
   * Returns the top card without removing it.
   * @returns {Card|null} The card on top of the pile, or null if empty.
   */
  getTopCard() {
    if (this.#cards.length === 0) {
      return null
    }
    return this.#cards[this.#cards.length - 1]
  }

  /**
   * Returns the number of cards in the discard pile.
   * @returns {number} The pile size.
   */
  getPileSize() {
    return this.#cards.length
  }

  /**
   * Removes and returns the top card from the discard pile.
   * @returns {Card} The card returned to the caller.
   * @throws {Error} If the pile is empty.
   */
  returnCardToDeck() {
    if (this.#cards.length === 0) {
      throw new Error("Discard pile is empty. Cannot return a card to the deck.")
    }
    return this.#cards.pop()
  }

  /**
   * Empties the pile and returns its former cards.
   * @returns {Card[]} The cards that were removed from the pile.
   */
  clearPile() {
    const clearedCards = [...this.#cards]
    this.#cards = []
    return clearedCards
  }
}