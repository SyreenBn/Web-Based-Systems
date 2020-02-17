/**
 * A single playing card.
 */
class Card {

  // Instance variables
  //   suit: Suit of this card (String)
  //   value: Numeric or face value of this card (String)

  constructor (aSuit, aValue) {
    this.suit = aSuit;
    this.value = aValue;
  }
  getSuit() { return this.suit; }
  getValue() { return this.value; }
  /**
   * Return a string representation of this card.
   */
  toString() {
    return this.value + this.suit ;
  }
}

