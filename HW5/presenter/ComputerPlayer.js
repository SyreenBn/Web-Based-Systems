class ComputerPlayer extends Player {
	
	/**
	* The computer player.
	*/
	constructor(_deck, _pile, _view) {
        super(_deck);
		this.deck = _deck;
        this.pile = _pile;
        this.view = _view;
    }
	
   /**
   * Play for the computer.  In this version, the computer always plays
   * the first card in its hand that is playable.  If it plays an 8,
   * the suit implicitly announced is the suit on the card.
   */
  takeATurn() {
    // Play the first playable card, or pick if none is playable.
    var i = 0;
    var hand = super.getHandCopy(); // copy of hand for convenience
    var card = hand[0];
    while (!this.pile.isValidToPlay(card) && i<hand.length-1) {
      i++;
      card = hand[i];
    }
    hand = null; // actual hand will change below, so don't continue to use copy
    if (this.pile.isValidToPlay(card)) {
      super.remove(i);
      this.pile.acceptACard(card);
      this.view.displayPileTopCard(card);
      if (card.getValue() == "8") {
        this.pile.setAnnouncedSuit(card.getSuit());
      }    
    }
    else {
      super.add(this.deck.dealACard(this.pile));
    }
    this.view.displayComputerHand(super.getHandCopy());
  }
	
}