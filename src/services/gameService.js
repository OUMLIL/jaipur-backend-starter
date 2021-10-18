import * as databaseService from "./databaseService"
import { shuffle } from "lodash"

// Return a shuffled starting deck except 3 camels
export function initDeck() {
  // TODO
  let deck = []
  for(let i = 0; i < 6; ++i) deck.push("diamonds")
  for(let i = 0; i < 6; ++i) deck.push("gold")
  for(let i = 0; i < 6; ++i) deck.push("silver")
  for(let i = 0; i < 8; ++i) deck.push("cloth")
  for(let i = 0; i < 8; ++i) deck.push("spice")
  for(let i = 0; i < 10; ++i) deck.push("leather")
  for(let i = 0; i < 11 - 3; ++i) deck.push("camel")

  return shuffle(deck)
}

// Draw {count} cards of a deck
export function drawCards(deck, count = 1) {
  // TODO
  const drawedCards = []
  if(deck.length < count) {
    throw new Error("Empty Deck !")
  }
  
  for (let i = 0; i < count; i++) {
    drawedCards.push(deck.shift())
  }

  return drawedCards
}

// Transfer camels from players hand (_players[i].hand) to their herd (_players[i].camelsCount)
export function putCamelsFromHandToHerd(game) {
  // TODO
  game._players.forEach((player) => {
    let camelIndex = player.hand.findIndex((card) => card === "camel")
    while (camelIndex !== -1) {
      player.hand.splice(camelIndex, 1)
      player.camelsCount++
      camelIndex = player.hand.findIndex((card) => card === "camel")
    }
  })
}

// Create a game object
export function createGame(name) {
    // TODO
    let gameId   = databaseService.getGames().length + 1
    let gameName = name
    let deck     =  initDeck()
    const market = ["camel", "camel", "camel", ...drawCards(deck, 2)]

    let game = {
        // identifiant de la partie
        "id": gameId,
        "name": gameName,
        // pioche //do it randomly
        "_deck": deck,
        // marché
        "market": market,
        "_players": [
            {
                // main
                "hand": drawCards(deck, 5),
                // nombre de chameaux
                "camelsCount": 0, 
                // Score actuel
                "score": 0,
            },
            {
                "hand": drawCards(deck, 5),
                "camelsCount": 0,
                "score": 0,
            }
        ],
        // joueur courant (0 ou 1)
        "currentPlayerIndex": 0,
        "tokens": {
            "diamonds": [7,7,5,5,5],
            "gold": [6,6,5,5,5],
            "silver": [5,5,5,5,5],
            "cloth": [5,3,3,2,2,1,1],
            "spice": [5,3,3,2,2,1,1],
            "leather": [4,3,2,1,1,1,1,1,1],
        },
        // ne pas oublier de les mélanger au début de la partie
        "_bonusTokens": {
            "3": shuffle([2,1,2,3,1,2,3]),
            "4": shuffle([4,6,6,4,5,5]),
            "5": shuffle([8,10,9,8,10]),
        },
        // est-ce que la partie est terminée?
        "isDone": false
    }  
    putCamelsFromHandToHerd(game)
    databaseService.saveGame(game)
    return game
}

export function getAll() {
  return databaseService.getGames()
}

export function getById(id){
  return databaseService.getGameById(id)
}