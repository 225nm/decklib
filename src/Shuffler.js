export class Shuffler {

  // Shuffles the deck using the Fisher-Yates algorithm and returns a new shuffled deck
 unShuffledDeck() {
    const cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        cards.push(new Card(suit, rank));
      }
    }
    return cards;
  }

}