import util from "node:util";

export const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
export const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Ace is considered to have a value of 14
const RANK_WEIGHTS = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const SUIT_WEIGHTS = {
  Hearts: 1,
  Diamonds: 2,
  Clubs: 3,
  Spades: 4,
};

const SUIT_COLORS = {
  Hearts: "Red",
  Diamonds: "Red",
  Clubs: "Black",
  Spades: "Black",
};

export class Card {
  #suit;
  #rank;
  constructor(suit, rank) {
    if (!SUITS.includes(suit) || !RANKS.includes(rank)) {
      throw new TypeError("Invalid suit or rank.");
    }
    this.#suit = suit;
    this.#rank = rank;
  }

  /**
   * Returns the card's suit.
   * @returns {string} The suit name.
   */
  getSuit() {
    return this.#suit;
  }

  /**
   * Returns the card's rank.
   * @returns {string} The rank name.
   */
  getRank() {
    return this.#rank;
  }

  /**
   * Returns the card's numeric rank value, where Ace is highest.
   * @returns {number} The rank weight.
   */
  getRankWeight() {
    return RANK_WEIGHTS[this.#rank];
  }

  /**
   * Returns the card's suit ordering value.
   * @returns {number} The suit weight.
   */
  getSuitWeight() {
    return SUIT_WEIGHTS[this.#suit];
  }

  /**
   * Returns the color of the card's suit.
   * @returns {"Red"|"Black"} The suit color.
   */
  getSuitColor() {
    return SUIT_COLORS[this.#suit];
  }

  /**
   * Returns a readable description of the card.
   * @returns {string} A string like "K of Spades".
   */
  toString() {
    return `${this.#rank} of ${this.#suit}`;
  }

  /**
   * Compares this card to another Card by rank weight, using suit weight as a tie-breaker.
   * @param {Card} otherCard The card to compare against.
   * @returns {number} Negative if this card is lower, positive if it is higher, or 0 if equal.
   * @throws {TypeError} If the argument is not a Card instance.
   */
  compareTo(otherCard) {
    if (!(otherCard instanceof Card)) {
      throw new TypeError("Argument must be an instance of Card.");
    }

    const rankDiff = this.getRankWeight() - otherCard.getRankWeight();
    if (rankDiff !== 0) {
      return rankDiff;
    }
    return this.getSuitWeight() - otherCard.getSuitWeight();
  }

  // Fixes node.js console.log() output for Card instances when using private fields
  [util.inspect.custom]() {
    return this.toString();
  }
}
