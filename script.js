"use strict";

/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author: 
      Date:       


      Filename:       js08.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
    // Reference buttons and images within the Poker Game page
    const dealButton = document.getElementById("dealB");
    const drawButton = document.getElementById("drawB");
    const standButton = document.getElementById("standB");
    const resetButton = document.getElementById("resetB");
    const statusBox = document.getElementById("status");
    const betSelection = document.getElementById("bet");
    const bankBox = document.getElementById("bank");
    const cardImages = document.querySelectorAll("img.cardImg");

    // Set the initial bank and bet values
    pokerGame.currentBank = 500;
    pokerGame.currentBet = 25;

    // Create a deck of shuffled cards
    let myDeck = new PokerDeck();
    myDeck.shuffle();

    // Create an empty poker hand object
    let myHand = new PokerHand(5);

    // Display the current bank value
    bankBox.value = pokerGame.currentBank;

    // Change the bet when the selection changes
    betSelection.onchange = function() {
        pokerGame.currentBet = parseInt(this.value);
    };

    dealButton.addEventListener("click", function() {
        if (pokerGame.currentBank >= pokerGame.currentBet) {
            // Enable the Draw and Stand buttons after the initial deal
            dealButton.disabled = true;
            betSelection.disabled = true;
            drawButton.disabled = false;
            standButton.disabled = false;
            statusBox.textContent = ""; // Clear status messages
            
            // Deal 5 cards from the deck to the hand
            myDeck.dealTo(myHand);

            // Display the card images on the table
            for (let i = 0; i < cardImages.length; i++) {
                cardImages[i].src = myHand.cards[i].cardImage();
                cardImages[i].onclick = function() {
                    toggleCardVisibility(this, myHand.cards[i]);
                };
            }
        } else {
            statusBox.textContent = "Insufficient Funds";
        }
    });

    drawButton.addEventListener("click", function() {
        if (pokerGame.currentBank >= pokerGame.currentBet) {
            dealButton.disabled = false;        // Enable Deal button
            betSelection.disabled = false;      // Enable Bet Selection list
            drawButton.disabled = true;         // Disable Draw button
            standButton.disabled = true;        // Disable Stand button
            
            // Replace cards marked to be discarded
            for (let i = 0; i < cardImages.length; i++) {
                if (cardImages[i].src.includes("cardback.png")) {
                    myHand.replaceCard(i, myDeck);
                    cardImages[i].src = myHand.cards[i].cardImage();
                }
            }

            // Reduce the bank by the size of the bet
            bankBox.value = pokerGame.placeBet();

            // Check if we need to shuffle the deck
            if (myDeck.cards.length < 10) {
                myDeck = new PokerDeck();
                myDeck.shuffle();
            }

            // Evaluate the hand drawn by the user
            statusBox.textContent = myHand.getHandValue();
        } else {
            statusBox.textContent = "Insufficient Funds";
        }
    });

    standButton.addEventListener("click", function() {
        dealButton.disabled = false;        // Enable Deal button
        betSelection.disabled = false;      // Enable Bet Selection list
        drawButton.disabled = true;         // Disable Draw button
        standButton.disabled = true;        // Disable Stand button  

        // Evaluate the hand drawn by the user and update bank
        const handValue = myHand.getHandValue();
        statusBox.textContent = handValue;
        bankBox.value = pokerGame.payBet(handValue);
    });

    resetButton.addEventListener("click", function() {
        location.reload();
    });
}

// Function to toggle card visibility
function toggleCardVisibility(cardImage, card) {
    cardImage.src = cardImage.src.includes("cardback.png") ? card.cardImage() : "cardback.png";
}