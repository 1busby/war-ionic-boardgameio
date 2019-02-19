import { Game } from 'boardgame.io/dist/core';
import { shuffle } from 'lodash';

/****************************
 * Initialize Cards
 ****************************/
let globalDeck = [];
let suits = [
  'Clubs',
  'Diamonds',
  'Hearts',
  'Spades'
];
// for each card value
for (let i = 0; i < 13; i++) {
  // for each card suit
  for (let j = 0; j < 4; j++) {
    let card: any = {};
    let suit = suits[j];
    card.rank = i + 2;
    
    if (i < 9) {
      card.name = `${card.rank} of ${suit}`;
      card.image = `assets/cards/${card.rank}${suit.charAt(0)}.png`;
    } else if (i === 9) {
      card.name = `Jack of ${suit}`;
      card.image = `assets/cards/J${suit.charAt(0)}.png`;
    } else if (i === 10) {
      card.name = `Queen of ${suit}`;
      card.image = `assets/cards/Q${suit.charAt(0)}.png`;
    } else if (i === 11) {
      card.name = `King of ${suit}`;
      card.image = `assets/cards/K${suit.charAt(0)}.png`;
    } else if (i === 12) {
      card.name = `Ace of ${suit}`;
      card.image = `assets/cards/A${suit.charAt(0)}.png`;
    }
    globalDeck.push(card);
  }
}

export const MyGame = Game({
  name: 'war',

  setup: () => ({
    deck: globalDeck,
    playerCards: [],
    playerField: [],
    botCards: [],
    botField: [],
    war: false
  }),

  moves: {
    newGame(G, ctx) {
      // shuffle the deck
      let deck = shuffle([...G.deck]);
      let playerCards = [];
      let botCards = [];

      // deal 26 cards to each player
      for (let i = 0; i < deck.length; i++) {
        i % 2 === 0 ? playerCards.push(deck[i]) : botCards.push(deck[i]);
      }
      
      return { ...G, deck, playerCards, botCards };
    },

    play(G, ctx) {
      console.log('play');
      let playerCards = [...G.playerCards];
      let playerField = [...playerCards.splice(0,1)];

      let botCards = [...G.botCards];
      let botField = [...botCards.splice(0,1)];
      // debugger
      return { ...G, playerCards, playerField, botCards, botField };
      // return { ...G }
    },

    playWar(G, ctx) {
      console.log('playWar');
      let playerCards = [...G.playerCards];
      let playerField = [...G.playerField, ...playerCards.splice(0,4)];

      let botCards = [...G.botCards];
      let botField = [...G.botField, ...botCards.splice(0,4)];
      
      return { ...G, playerCards, playerField, botCards, botField };
    }
  },

  flow: {
    onMove: (G, ctx) => {
      console.log('onMove');

      let war = G.war;
      let playerCards = [...G.playerCards];
      let playerField = [...G.playerField];
      let botCards = [...G.botCards];
      let botField = [...G.botField];
      if (
        G.playerField.length > 0 &&
        G.botField.length > 0
        ) {
        // debugger
        let playerCardRank = playerField[playerField.length - 1].rank;
        let botCardRank = botField[botField.length - 1].rank;

        if (playerCardRank > botCardRank) {
          playerCards = [...playerCards, ...playerField, ...botField];
          war = false;
        } else if (playerCardRank < botCardRank) {
          botCards = [...botCards, ...playerField, ...botField];
          war = false;
        } else {
          debugger
          war = true;
        }
      }
      return { ...G, war, playerCards, playerField, botCards, botField };
    },
    endGameIf: (G, ctx) => {
      console.log('endGameIf');
      if (G.playerField.length === 52) return { winner: 'You!' };
      if (G.botField.length === 52) return { winner: 'Bot :(' };
    },
  },
});
