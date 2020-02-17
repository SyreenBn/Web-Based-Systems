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
  }
  /**
   * Display information about the computer's hand.
   * Hand is an array of Card's.
   */
  displayComputerHand(hand) {
    window.alert("Computer now has " + hand.length + " cards.");
  }
  /**
   * Display the top card of the discard pile (at the next opportunity).
   */
  displayPileTopCard(card) {
    this.topCard = card;
    this.topCardString = "Top card of pile: " + card;
  }
  /**
   * Display a "wrong card" message (at the next opportunity).
   */
  displayWrongCardMsg(cardString) {
    this.errorString = "Bad input '" + cardString + "'. Please try again.";
  }
  /**
   * Display the human hand, prompt the user for their card pick,
   * and pass the pick to a callback method on the presenter.
   */
  displayHumanHand(hand) {
    let promptString = "";
    if (this.errorString) {
      promptString += this.errorString + "\n\n";
      this.errorString = "";
    }
    promptString += "Your hand: " + hand.toString() + "\n"; 
    promptString += this.topCardString + "\n";
    promptString += "Enter card to play or p to pick a card.";
    let cardString = window.prompt(promptString, "");
    this.presenter.cardPicked(cardString);
  }
  /**
   * Display the suit picker, prompt the user for their suit pick,
   * and pass the pick to a callback method on the presenter.
   */
  displaySuitPicker(hand) {
     let suit = window.prompt("Your hand: " + hand.toString() + 
                              "\nWhat suit would you like the 8 to represent" +
                              " (c, d, h, or s)?");
     this.presenter.suitPicked(suit);                   
  }
  /**
   * Announce that human has won.
   */
  announceHumanWinner() {
    window.alert("Congratulations!");
  }
  /**
   * Announce that I have won.
   */
  announceComputerWinner() {
    window.alert("Thanks for being a good loser.");
  }
}
