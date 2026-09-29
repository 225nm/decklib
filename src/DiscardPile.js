import { Card } from './Card.js'

export class DiscardPile {
  #cards

  constructor(cards = []) {
    this.#cards = [...cards]
  }

  addCard(cards) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards)
    } else {
      this.#cards.push(cards)
    }
  }

  getCards() {
    return [...this.#cards]
  }

  getTopCard() {
    if (this.#cards.length === 0) {
      return null
    }
    return this.#cards[this.#cards.length - 1]
  }
// Returns the amount of cards in discard pile
  getPileSize() {
    return this.#cards.length
  }

  returnCardToDeck() {
    if (this.#cards.length === 0) {
      throw new Error("Discard pile is empty. Cannot return a card to the deck.")
    }
    return this.#cards.pop()
  }

  clearPile() {
    const clearedCards = [...this.#cards]
    this.#cards = []
    return clearedCards
  }
}