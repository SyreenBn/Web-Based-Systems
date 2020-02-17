/**
 * Provide methods that use the system I/O to interact with the user.
 * This implementation uses the JavaScript window.prompt() method
 * for input (and some output) and window.alert() for (purely) output.
 */
class View {
  constructor(presenter) {
    this.presenter = presenter;
    this.topCard = null;
    this.topCardString = "";
    this.errorString = "";
    this.hand = null;
    this.cardPicked = "";
    this.suitPicked = "";
    this.humanWinner = false;
    this.computerWinner = false;
  }
  /**
   * Display information about the computer's hand.
   * Hand is an array of Card's.
   */
  displayComputerHand(hand) {
    this.hand = hand;
  }
  /**
   * Display the top card of the discard pile (at the next opportunity).
   */
  displayPileTopCard(card) {
    this.topCard = card;
  }
  /**
   * Display a "wrong card" message (at the next opportunity).
   */
  displayWrongCardMsg(cardString) {
    this.errorString = cardString;
  }
  /**
   * Display the human hand, prompt the user for their card pick,
   * and pass the pick to a callback method on the presenter.
   */
  displayHumanHand(hand) {
    // If called after an error, pick.
    if (this.errorString) {
      this.presenter.cardPicked("p");
    }
    else {  
      this.hand = hand;
      if (typeof this.cardPicked == "string") {
        this.presenter.cardPicked(this.cardPicked);
      }
      else { // If not a string, it's an array of strings.
        this.presenter.cardPicked(this.cardPicked.pop());
      }
    }
  }
  /**
   * Display the suit picker, prompt the user for their suit pick,
   * and pass the pick to a callback method on the presenter.
   */
  displaySuitPicker(hand) {
     this.hand = hand;
     this.presenter.suitPicked(this.suitPicked);
  }
  /**
   * Announce that human has won.
   */
  announceHumanWinner() {
    this.humanWinner = true;
  }
  /**
   * Announce that I have won.
   */
  announceComputerWinner() {
    this.computerWinner = true;
  }
}
