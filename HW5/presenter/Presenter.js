class Presenter {
	/**
     * Initialize game by creating and shuffling the deck,
     * dealing one card (other than an 8) to the discard pile,
     * and dealing 7 cards to each player.
     */
	constructor (){
    this.deck = new Deck();
	do {
		this.deck.shuffle();
    } while (this.deck.isTopCardAnEight())
	this.pile = new Pile();
	this.pile.acceptACard(this.deck.dealACard(null));
	this.view = new View(this);
    this.human = new HumanPlayer(this.deck, this.pile, this.view);
    this.computer = new ComputerPlayer(this.deck, this.pile, this.view);
	}
	
	/**
     * Play one complete game.
     */
    play() { 
        do {
            this.human.takeATurn();
            if (!this.human.isHandEmpty()) {
                this.computer.takeATurn();
            }
        } while (!(this.human.isHandEmpty() || this.computer.isHandEmpty()));
        if (this.human.isHandEmpty()) {
            this.view.announceHumanWinner();
        }
        else {
            this.view.announceComputerWinner();
        }
    }
	
    /**
     * Callback that receives a string representing the card picked by
     * the user through the View.  This is passed on to the HumanPlayer
     * object for processing.
     */
    cardPicked(cardString) {
        this.human.cardPicked(cardString);
    }
	
    /**
     * Callback that receives a string representing the suit picked by
     * the user through the View.  This is passed on to the
     * HumanPlayer object for processing.
     */
    suitPicked(suit) {
        this.human.suitPicked(suit);
    }
    
    
}
