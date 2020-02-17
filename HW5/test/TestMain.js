"use strict";

// Test Card
var card = new Card("h", "10");
if (card != "10h") {
  alert("Fail Card test: " + card);
}

// Test Pile
var pile = new Pile();
pile.acceptACard(card); // 10h
if (pile.getTopCard() != card) {
  alert("Fail Pile test 1: " + pile.getTopCard());
}
var card2 = new Card("s", "7");
pile.acceptACard(card2);
if (pile.getTopCard() != card2) {
  alert("Fail Pile test 2: " + pile.getTopCard());
}
var card3 = new Card("s", "j");
if (!pile.isValidToPlay(card3)) {
  alert("Fail Pile test 3: " + pile.getTopCard());
}
var card4 = new Card("c", "7");
if (!pile.isValidToPlay(card4)) {
  alert("Fail Pile test 4: " + pile.getTopCard());
}
var card5 = new Card("h", "8");
if (!pile.isValidToPlay(card5)) {
  alert("Fail Pile test 5: " + pile.getTopCard());
}
var card6 = new Card("h", "10");
if (pile.isValidToPlay(card6)) {
  alert("Fail Pile test 6: " + pile.getTopCard());
}
pile.acceptACard(card5);
pile.setAnnouncedSuit("c");
if (!pile.isValidToPlay(card4)) {
  alert("Fail Pile test 7: " + pile.getTopCard());
}
if (pile.isValidToPlay(card6)) {
  alert("Fail Pile test 8: " + pile.getTopCard());
}
if (!pile.isValidToPlay(card5)) {
  alert("Fail Pile test 9: " + pile.getTopCard());
}
pile.acceptACard(card6);
if (pile.isValidToPlay(card4)) {
  alert("Fail Pile test 10: " + pile.getTopCard());
}
if (pile.hasOwnProperty("isValidToPlay")) {
  alert("Fail Pile test 11");
}
if (!Pile.prototype.hasOwnProperty("isValidToPlay")) {
  alert("Fail Pile test 12");
}

// Test Player
var deck = new Deck(); // unshuffled; 2-8 of clubs on top
var player = new Player(deck); 
for (let i=1; i<=7; i++) {
  if (player.isHandEmpty()) {
    alert("Fail Player test " + i);
  }
  player.remove(0);
}
if (!player.isHandEmpty()) {
  alert("Fail Player test 8");
}
player.add(card6);
if (player.isHandEmpty()) {
  alert("Fail Player test 9");
}
player.add(card5);
if (player.find(card5.toString()) != card5) {
  alert("Fail Player test 10");
}
if (player.find(card4.toString())) {
  alert("Fail Player test 11");
}
if (player.indexOf(card4) != -1) {
  alert("Fail Player test 12");
}
if (player.indexOf(card6) != 0) {
  alert("Fail Player test 13");
}
var copy = player.getHandCopy();
if (copy == player.list) {
  alert("Fail Player test 14");
}
if (copy.length != 2 || copy[0] != card6 || copy[1] != card5) {
  alert("Fail Player test 15");
}

// Test ComputerPlayer
deck = new Deck(); // unshuffled; 2-8 of clubs on top
pile = new Pile();
pile.acceptACard(deck.dealACard());       // 2c on top of pile
var view = new View();
// After the following, cards in hand (list): 3c through 9c
var computerPlayer = new ComputerPlayer(deck, pile, view); 
if (!(computerPlayer instanceof Player)) {
  alert("Fail ComputerPlayer test 1");
}
if (computerPlayer.hasOwnProperty('takeATurn')) {
  alert("Fail ComputerPlayer test 2");
}
if (!ComputerPlayer.prototype.hasOwnProperty('takeATurn')) {
  alert("Fail ComputerPlayer test 3");
}
if (computerPlayer.hasOwnProperty('remove')) {
  alert("Fail ComputerPlayer test 4");
}
if (ComputerPlayer.prototype.hasOwnProperty('remove')) {
  alert("Fail ComputerPlayer test 5");
}
if (computerPlayer.deck.list.length != 44) {
  alert("Fail ComputerPlayer test 6");
}
if (!computerPlayer.find("3c")) {
  alert("Fail ComputerPlayer test 7");
}
computerPlayer.takeATurn();
if (pile.getTopCard() != "3c") {
  alert("Fail ComputerPlayer test 8");
}
if (view.topCard != "3c") {
  alert("Fail ComputerPlayer test 9");
}
if (view.hand[2] != "6c") {
  alert("Fail ComputerPlayer test 10");
}
if (view.hand == computerPlayer.list) {
  alert("Fail ComputerPlayer test 11");
}
var tenOfHearts = new Card("h","10");
pile.acceptACard(tenOfHearts);
computerPlayer.takeATurn();
if (pile.getTopCard() != "8c") {
  alert("Fail ComputerPlayer test 12");
}
if (pile.announcedSuit != "c") {
  alert("Fail ComputerPlayer test 13");
}
if (view.hand.length != 5) {
  alert("Fail ComputerPlayer test 14");
}
if (view.hand[4] != "9c") {
  alert("Fail ComputerPlayer test 15");
}
pile.acceptACard(tenOfHearts);
computerPlayer.takeATurn();
if (view.hand.length != 6) {
  alert("Fail ComputerPlayer test 16");
}
if (view.hand[5] != "10c") {
  alert("Fail ComputerPlayer test 17");
}

// Test HumanPlayer 
deck = new Deck(); // unshuffled; 2-8 of clubs on top
pile = new Pile();
pile.acceptACard(deck.dealACard());       // 2c on top of pile
var view = new View();
// After the following, cards in hand (list): 3c through 9c
var humanPlayer = new HumanPlayer(deck, pile, view); 
view.presenter = humanPlayer;  
if (!(humanPlayer instanceof Player)) {
  alert("Fail HumanPlayer test 1");
}
if (humanPlayer.hasOwnProperty('takeATurn')) {
  alert("Fail HumanPlayer test 2");
}
if (!HumanPlayer.prototype.hasOwnProperty('takeATurn')) {
  alert("Fail HumanPlayer test 3");
}
if (humanPlayer.hasOwnProperty('remove')) {
  alert("Fail HumanPlayer test 4");
}
if (HumanPlayer.prototype.hasOwnProperty('remove')) {
  alert("Fail HumanPlayer test 5");
}
if (humanPlayer.deck.list.length != 44) {
  alert("Fail HumanPlayer test 6");
}
if (!humanPlayer.find("3c")) {
  alert("Fail HumanPlayer test 7");
}
view.cardPicked = "3c";
humanPlayer.takeATurn();
if (view.hand[2] != "5c") {
  alert("Fail HumanPlayer test 8");
}
if (view.topCard != "2c") {
  alert("Fail HumanPlayer test 9");
}
if (pile.getTopCard() != "3c") {
  alert("Fail HumanPlayer test 10");
}
if (humanPlayer.list.length != 6) {
  alert("Fail HumanPlayer test 11");
}
pile.acceptACard(tenOfHearts);
view.cardPicked = "8c";
view.suitPicked = "d";
humanPlayer.takeATurn();
if (pile.getTopCard() != "8c") {
  alert("Fail HumanPlayer test 12");
}
if (pile.announcedSuit != "d") {
  alert("Fail HumanPlayer test 13");
}
if (view.hand.length != 5) {
  alert("Fail HumanPlayer test 14");
}
if (view.hand[4] != "9c") {
  alert("Fail HumanPlayer test 15");
}
view.cardPicked = "4c";
humanPlayer.takeATurn();
if (pile.getTopCard() != "8c") {
  alert("Fail HumanPlayer test 16");
}
if (view.errorString != "4c") {
  alert("Fail HumanPlayer test 17");
}
if (humanPlayer.list.length != 6) {
  alert("Fail HumanPlayer test 18");
}
if (humanPlayer.list[5] != "10c") {
  alert("Fail HumanPlayer test 19");
}

// Test Presenter
var presenter = new Presenter();
deck = new Deck();
deck.list.splice(6,1); // 8c
deck.list.splice(0,0,new Card("s","j"));
deck.list.splice(0,0,new Card("s","q"));
deck.list.splice(0,0,new Card("s","k"));
deck.list.splice(0,0,new Card("s","a"));
deck.list.splice(0,0,new Card("h","a"));
deck.list.splice(0,0,new Card("h","k"));
deck.list.splice(0,0,new Card("h","q"));
presenter.deck = deck;
pile = new Pile();
pile.acceptACard(new Card("s","10"));
presenter.pile = pile;
presenter.human = new HumanPlayer(deck, pile, presenter.view);
presenter.computer = new ComputerPlayer(deck, pile, presenter.view);
presenter.view.cardPicked = ["kh", "ks", "as", "ah", "qh", "qs", "js"];
presenter.play();
if (!presenter.view.humanWinner) {
  alert("Fail Presenter test 1");
}
if (presenter.computer.list.length != 11) {
  alert("Fail Presenter test 2");
}

// If we reach this with no alerts, all tests passed.  
alert("Tests completed. If this is the only alert, all tests passed.");
