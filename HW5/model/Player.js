class Player {
    
    

    constructor(deck) {
    	//This player's hand.
		this.list = new Array();
      
        // Get seven cards from the deck and store them in this hand.
        for (var i=1; i<=7; i++) {
            this.list.push(deck.dealACard(null)); // No discards to backup deck
        }
    } 
  
    /**
     * Return true when this hand is empty.
     */
    isHandEmpty() {
		return this.list.length == 0;
    }
	
	/**
     * Add the given Card object to this player's hand.
     */
    add(card) {
        this.list.push(card);
    }
	
	/**
     * Remove the card at the specified position (0-based) in
     * this player's hand.
     */
    remove(i) {
        this.list.splice(i,1);
    }
	
	/**
     * Given the string specification of a card,
     * return the card if it is in this player's hand
     * or return null.
     */
    find(cardString) {
        var i = 0;
        var card = null;
        while (i<this.list.length && card == null) {
			if (this.list[i].toString() == cardString){
                card = this.list[i];
            }
            i++;
        }
        return card;
    }
	
	/**
     * Return index of given Card object, or -1 if card not in hand.
     */
    indexOf(card) {
		return this.list.indexOf(card);
    }

    /**
     * Return copy of this player's hand (ArrayList of Card objects).
     * Changes to the returned array will not affect the Player's hand.
     */
    getHandCopy() {
        return this.list.slice(0);
    }
}
