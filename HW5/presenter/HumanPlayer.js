class HumanPlayer extends Player {
	
	/**
	* Interact with the human player to obtain their desired play.
	*/
    constructor(_deck, _pile, _view) {
        super(_deck);
		this.deck = _deck;
        this.pile = _pile;
        this.view = _view;
    }
	
	/**
     * Allow the human player to take a turn by either
     * selecting a card to play to the discard pile from their hand or
     * drawing a card from the deck.
     */
    takeATurn() {
        this.view.displayPileTopCard(this.pile.getTopCard());
        this.view.displayHumanHand(this.getHandCopy());
        // Assume that displayHumanHand continues at cardPicked().
    }
	
	/**
     * Callback after the user has picked a card.
     */
    cardPicked(cardString) {
        var card = super.find(cardString);
        if ((cardString !=("p") )&&
            (card == null ||
             !this.pile.isValidToPlay(card))) {
            this.view.displayWrongCardMsg(cardString);
            this.view.displayHumanHand(this.getHandCopy());
            return;  // Call cardPicked() after user selects a different card
        }
        if (cardString == "p") {
            super.add(this.deck.dealACard(this.pile));
        }
        else {
            super.remove(this.list.indexOf(card));
            this.pile.acceptACard(card);
            if (card.getValue() == "8") {
                this.view.displaySuitPicker(this.getHandCopy());
                // Continue at suitPicked after user picks a suit.
            }
        }
    }
	
	/**
     * Callback after user has picked the suit that an 8 represents.
     */
    suitPicked(suit) {
        if (!(suit == "c" || suit =="d" ||
              suit == "h" || suit == "s")) {
            this.view.displaySuitPicker(super.getHandCopy());
            return; // Call suitPicked after user picks different suit.
        }
        this.pile.setAnnouncedSuit(suit);
    }
}