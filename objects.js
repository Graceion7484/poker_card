"use strict";

/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Custom Objects Used in Poker Games
      Author: 
      Date:       

      Filename:       objects.js
 */

/* Object defining the poker game */
let pokerGame = {
   currentBank: null,
   currentBet: null,

   placeBet: function() {
      this.currentBank -= this.currentBet;
      return this.currentBank;
   }
};

/* Constructor function for poker decks */
function PokerDeck() {
   let suits = ["clubs", "diamonds", "hearts", "spades"];
   let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
   this.cards = [];

/* Constructor function for poker hands */
function pokerHand(handLength) {
   this.cards = new Array(handLength);
   }

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
      };
   };

// Method to deal cards from the deck into a hand
this.dealTo = function(pokerHand) {
   let cardsDealt = pokerHand.cards.length;
   pokerHand.cards = this.cards.splice(0, cardsDealt);
   };

}

/* Constructor function for poker cards */
function PokerCard(cardSuit, cardRank) {
   this.suit = cardSuit;
   this.rank = cardRank;
}

// Method to reference the image of the poker card
pokerCard.prototype.cardImage = function() {
   return this.rank + "_" + this.suit + ".png";
   }
   

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
   if (hasFlush()) return "Flush";
   if (hasStraight()) return "Straight";
   if (fourOfAKind) return "Four of a Kind";
   if (threeOfAKind && pairs === 1) return "Full House";
   if (threeOfAKind) return "Three of a Kind";
   if (pairs === 2) return "Two Pair";
   if (pairs === 1) return highestCard >= 11 ? "Jacks or Better" : "Pair";
   
   return "No Winner";
}
   /* ------------------------------------------------+
   |             End of the  handType() function      |
   +-------------------------------------------------*/   
 
 
 
 
 
 
 


















