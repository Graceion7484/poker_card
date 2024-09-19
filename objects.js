"use strict";

/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Custom Objects Used in Poker Games
      Author: 
      Date:       

      Filename:       objects.js
 */

/* Constructor function for poker cards */
function PokerCard(cardSuit, cardRank) {
   this.suit = cardSuit;
   this.rank = cardRank;
}

// Method to reference the image of the poker card
PokerCard.prototype.cardImage = function() {
   return `${this.rank}_${this.suit}.png`;
};

/* Constructor function for poker hands */
function PokerHand(handLength) {
   this.cards = new Array(handLength).fill(null); // Initialize with null
}

// Method to replace a card in a hand with a card from a deck
PokerHand.prototype.replaceCard = function(index, pokerDeck) {
   this.cards[index] = pokerDeck.cards.shift();
};

// Method to determine the value of the poker hand
PokerHand.prototype.getHandValue = function() {
   return handType(this);
};

/* Constructor function for poker decks */
function PokerDeck() {
   const suits = ["clubs", "diamonds", "hearts", "spades"];
   const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
   this.cards = [];

   // Add a card for each combination of suit and rank
   for (let suit of suits) {
      for (let rank of ranks) {
         this.cards.push(new PokerCard(suit, rank));
      }
   }

   // Method to randomly sort the cards in the deck
   this.shuffle = function() {
      for (let i = this.cards.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
   };

   // Method to deal cards from the deck into a hand
   this.dealTo = function(pokerHand) {
      let cardsDealt = pokerHand.cards.length;
      pokerHand.cards = this.cards.splice(0, cardsDealt);
   };
}

/* Object defining the poker game */
let pokerGame = {
   currentBank: null,
   currentBet: null,

   placeBet: function() {
      this.currentBank -= this.currentBet;
      return this.currentBank;
   },

   payBet: function(type) {
      let pay = 0;
      switch (type) {
         case "Royal Flush": pay = 250; break;
         case "Straight Flush": pay = 50; break;
         case "Four of a Kind": pay = 25; break;
         case "Full House": pay = 9; break;
         case "Flush": pay = 6; break;
         case "Straight": pay = 4; break;
         case "Three of a Kind": pay = 3; break;
         case "Two Pair": pay = 2; break;
         case "Jacks or Better": pay = 1; break;
      }
      this.currentBank += pay * this.currentBet;
      return this.currentBank;
   }
};

/* Function to determine the hand type */
function handType(pokerHand) {
   // Assign rank values to the cards
   pokerHand.cards.forEach(card => {
      card.rankValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'].indexOf(card.rank) + 2;
   });

   // Helper functions
   const hasFlush = () => pokerHand.cards.every(card => card.suit === pokerHand.cards[0].suit);
   const hasStraight = () => {
      pokerHand.cards.sort((a, b) => a.rankValue - b.rankValue);
      return pokerHand.cards.every((card, index, arr) => index === 0 || card.rankValue === arr[index - 1].rankValue + 1);
   };

   const countRanks = () => {
      const counts = {};
      pokerHand.cards.forEach(card => counts[card.rankValue] = (counts[card.rankValue] || 0) + 1);
      return counts;
   };

   const rankCounts = countRanks();
   const pairs = Object.values(rankCounts).filter(count => count === 2).length;
   const threeOfAKind = Object.values(rankCounts).includes(3);
   const fourOfAKind = Object.values(rankCounts).includes(4);
   const highestCard = Math.max(...Object.keys(rankCounts));

   // Determine hand type
   if (hasFlush() && hasStraight() && highestCard === 14) return "Royal Flush";
   if (hasFlush() && hasStraight()) return "Straight Flush";
   if (fourOfAKind) return "Four of a Kind";
   if (threeOfAKind && pairs === 1) return "Full House";
   if (hasFlush()) return "Flush";
   if (hasStraight()) return "Straight";
   if (threeOfAKind) return "Three of a Kind";
   if (pairs === 2) return "Two Pair";
   if (pairs === 1) return highestCard >= 11 ? "Jacks or Better" : "Pair";

   return "No Winner";
}
   /* ------------------------------------------------+
   |             End of the  handType() function      |
   +-------------------------------------------------*/   
 
 
 
 
 
 
 


















