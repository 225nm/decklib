# DeckLib

DeckLib is an ES module for creating and manipulating playing cards, decks, hands, and discard piles. It uses no external runtime dependencies.

## Installation

```sh
npm install github:eb225nm/decklib
```

Import the classes you need from the package:

```js
import { Card, Deck, DiscardPile, Hand, Shuffler } from "DeckLib";
```

- Ensure that your package.json has type: "module"

## Example usage

```js
import { Deck, DiscardPile, Hand } from "DeckLib";

import { Deck, Hand, DiscardPile } from "decklib";

const deck = new Deck();       // shuffled standard 52-card deck
const discardPile = new DiscardPile(); // Discard pile for played cards
const hand = new Hand(deck.drawMultiple(5)); // A player hand with 5 drawn cards

hand.sortByValue(); // Sort the hand by value
console.log(hand.getCards());  // e.g. [2 of Hearts, 7 of Clubs, ...]

const [firstCard] = hand.getCards(); // Plays the first card in the hand
hand.playCard(firstCard, discardPile);

console.log(deck.remainingDeckSize()); // Gets the remaining deck size
console.log(discardPile.getPileSize()); // Gets the discard pile size
```
### Output
```
[ 2 of Spades, 4 of Hearts, 6 of Clubs, 7 of Diamonds, 7 of Clubs ]
47
1
```

## Public API

All classes and constants below are exported from the package entry point.

### `Card`

`new Card(suit, rank)` creates a card. `suit` must be one of `Hearts`, `Diamonds`, `Clubs`, or `Spades`. `rank` must be one of `2` through `10`, `J`, `Q`, `K`, or `A`. An invalid suit or rank throws a `TypeError`.

| Method | Result |
| --- | --- |
| `getSuit()` | The suit string. |
| `getRank()` | The rank string. |
| `getRankWeight()` | Rank value from 2 through 14, with Ace high. |
| `getSuitWeight()` | Suit order value: Hearts, Diamonds, Clubs, then Spades. |
| `getSuitColor()` | `"Red"` for Hearts or Diamonds; `"Black"` for Clubs or Spades. |
| `toString()` | A readable string, such as `"K of Spades"`. |
| `compareTo(otherCard)` | Negative, zero, or positive according to rank, then suit. Throws a `TypeError` if the argument is not a `Card`. |

Cards also use Node.js custom inspection, so logging a card displays its readable string.

### `Deck`

`new Deck(cards = null, shuffler = new Shuffler())` creates a deck. With no `cards` argument, it creates and shuffles a standard 52-card deck. A supplied `cards` argument is used as the deck's initial contents. A custom `shuffler` must provide `shuffle(cards)` and return the shuffled array.

| Method | Result and behavior |
| --- | --- |
| `shuffle()` | Shuffles the current deck in place; returns `undefined`. |
| `standardDeck()` | Creates and returns a shuffled standard 52-card array. |
| `unShuffledDeck()` | Creates and returns a standard 52-card array in suit/rank order. |
| `draw()` | Removes and returns the top card. Throws an `Error` if the deck is empty. |
| `drawMultiple(count)` | Removes and returns `count` cards. `count` must be a positive integer no greater than the remaining deck size; otherwise throws an `Error`. |
| `remainingDeckSize()` | The number of cards remaining. |
| `isDeckEmpty()` | `true` if no cards remain; otherwise `false`. |
| `getCards()` | A shallow copy of the current card array. |
| `getTopCard()` | The top card without removing it. Throws an `Error` if the deck is empty. |
| `reshuffleDiscardPile(discardPile)` | Moves every card from a non-empty discard pile into the deck and shuffles. Throws an `Error` if the pile is empty. |

The top card is the last card in the deck's internal array, so drawing removes from that end.

### `Hand`

`new Hand(cards = [])` creates a hand with the supplied cards, or an empty hand by default.

| Method | Result and behavior |
| --- | --- |
| `addCard(cardOrCards)` | Adds one card or every card in an array; returns `undefined`. |
| `removeCard(card)` | Removes and returns a matching card, matching by suit and rank. Returns `undefined` if none is present. Throws a `TypeError` if the argument is not a `Card`. |
| `getHandSize()` | The number of cards in the hand. |
| `getCards()` | A shallow copy of the hand's card array. |
| `sortByValue()` | Sorts the hand in ascending rank and suit order; returns `undefined`. |
| `playCard(card, discardPile)` | Removes the card from the hand and adds it to the discard pile. Throws an `Error` if the card is not in the hand. |

### `DiscardPile`

`new DiscardPile(cards = [])` creates a discard pile with the supplied cards, or an empty pile by default.

| Method | Result and behavior |
| --- | --- |
| `addCard(cardOrCards)` | Adds one card or every card in an array; returns `undefined`. |
| `getCards()` | A shallow copy of the pile's card array. |
| `getTopCard()` | The top card, or `null` if the pile is empty. Does not remove the card. |
| `getPileSize()` | The number of cards in the pile. |
| `returnCardToDeck()` | Removes and returns the top card. Throws an `Error` if the pile is empty; the caller is responsible for adding the returned card to a deck. |
| `clearPile()` | Empties the pile and returns an array containing its former cards. |

### `Shuffler`

`new Shuffler()` creates the default shuffler.

| Method | Result and behavior |
| --- | --- |
| `shuffle(cards)` | Returns a shuffled copy of the supplied array using the Fisher-Yates algorithm; the input array is not modified. |

### Exported constants

- `SUITS`: `Hearts`, `Diamonds`, `Clubs`, and `Spades` in the standard suit order.
- `RANKS`: `2` through `10`, followed by `J`, `Q`, `K`, and `A` in ascending rank order.