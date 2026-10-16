import { Card, SUITS, RANKS } from "./Card.js";
import { Shuffler } from "./Shuffler.js";

export class Deck {
  #cards;
  #shuffler;
  constructor(cards = null, shuffler = new Shuffler()) {
    this.#shuffler = shuffler;
    this.#cards = cards || this.standardDeck();
  }

  /**
   * Shuffles the deck in place using the configured shuffler.
   * @returns {void}
   */
  shuffle() {
    this.#cards = this.#shuffler.shuffle(this.#cards);
  }

  /**
   * Creates and returns a shuffled standard 52-card deck.
   * @returns {Card[]} A shuffled deck array.
   */
  standardDeck() {
    const cards = this.unShuffledDeck();
    return this.#shuffler.shuffle(cards);
  }

  /**
   * Creates and returns a standard 52-card deck in suit/rank order.
   * @returns {Card[]} An unshuffled deck array.
   */
  unShuffledDeck() {
    const cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        cards.push(new Card(suit, rank));
      }
    }
    return cards;
  }

  /**
   * Removes and returns the top card from the deck.
   * @returns {Card} The drawn card.
   * @throws {Error} If the deck is empty.
   */
  draw() {
    if (this.isDeckEmpty()) {
      throw new Error("Deck is empty. Cannot draw a card.");
    }
    return this.#cards.pop();
  }

  /**
   * Removes and returns the requested number of cards from the top of the deck.
   * @param {number} count The number of cards to draw.
   * @returns {Card[]} An array of drawn cards.
   * @throws {Error} If the count is not a positive integer or exceeds the deck size.
   */
  drawMultiple(count) {
    if (count <= 0 || !Number.isInteger(count)) {
      throw new Error("Invalid count. Please provide a positive integer.");
    }
    if (count > this.remainingDeckSize()) {
      throw new Error(
        `Cannot draw ${count} cards. Only ${this.remainingDeckSize()} cards remaining in the deck.`,
      );
    }

    const drawnCards = [];
    for (let i = 0; i < count; i++) {
      const card = this.draw();
      drawnCards.push(card);
    }
    return drawnCards;
  }

  /**
   * Returns the number of cards remaining in the deck.
   * @returns {number} The deck size.
   */
  remainingDeckSize() {
    return this.#cards.length;
  }

  /**
   * Indicates whether the deck is empty.
   * @returns {boolean} True when the deck has no cards remaining.
   */
  isDeckEmpty() {
    return this.#cards.length === 0;
  }

  /**
   * Returns a shallow copy of the deck's current cards.
   * @returns {Card[]} A copy of the deck contents.
   */
  getCards() {
    return [...this.#cards];
  }

  /**
   * Returns the top card without removing it.
   * @returns {Card} The card on top of the deck.
   * @throws {Error} If the deck is empty.
   */
  getTopCard() {
    if (this.isDeckEmpty()) {
      throw new Error("Deck is empty. No top card available.");
    }
    return this.#cards[this.#cards.length - 1];
  }

  /**
   * Adds a card to the top of the deck so it is the next card drawn.
   * @param {Card} card The card to add.
   * @returns {void}
   * @throws {TypeError} If the argument is not a Card instance.
   */
  addCard(card) {
    if (!(card instanceof Card)) {
      throw new TypeError("Argument must be an instance of Card.");
    }
    this.#cards.push(card);
  }

  /**
   * Moves all cards from a discard pile into the deck and reshuffles it.
   * @param {DiscardPile} discardPile The discard pile to draw from.
   * @returns {void}
   * @throws {Error} If the discard pile is empty.
   */
  reshuffleDiscardPile(discardPile) {
    if (discardPile.getPileSize() === 0) {
      throw new Error("Discard pile is empty. Cannot reshuffle into the deck.");
    }
    const cardsToReshuffle = discardPile.clearPile();
    this.#cards.push(...cardsToReshuffle);
    this.shuffle();
  }
}
