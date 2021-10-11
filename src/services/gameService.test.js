import * as gameService from "./gameService"


describe("Game service", () => {
    test("should init a deck", () => {
      // TOTO
      expect(gameService.initDeck().length).toBe(52)
    })
  
    test("should draw cards", () => {
      // TODO
      let deck = gameService.initDeck()
      let initialLength = deck.length
      let count = 1

      expect(gameService.drawCards(deck, count).length).toBe(count)
      //cards drawed are well removed from deck
      expect(deck.length).toBe(initialLength - count)
    })
  
    test("should put camels from hand to herd", () => {
      // TODO
      const game = {_players: [
        {hand : ["camel", "gold"], camelCount: 0},
        {hand : ["gold", "gold"], camelCount: 0},
      ]}

      gameService.putCamelsFromHandToHerd(game)
      expect(game._players[0].hand.length).toBe(1)
      expect(game._players[0].hand).toStrictEqual(["gold"])
      expect(game._players[1].hand).toStrictEqual(["gold", "gold"])
      expect(game._players[1].hand.length).toBe(2)
    })


    
    test("drawing a card if no more cards in deck", () => {
      let deck = gameService.initDeck()
      let initialLength = deck.length
      let count = 52

      expect(gameService.drawCards(deck, count).length).toBe(count)
      //cards drawed are well removed from deck
      expect(deck.length).toBe(0)

      //no more cards in deck
      expect(() => gameService.drawCards(deck, 4)).toThrow(Error)

      /*
      expect(drawedCards.filter(card => card == "diamonds")).length.toBe(0)
      expect(drawedCards.filter(card => card == "gold")).length.toBe(0)
      expect(drawedCards.filter(card => card == "silver")).length.toBe(0)
      expect(drawedCards.filter(card => card == "cloth")).length.toBe(0)
      expect(drawedCards.filter(card => card == "spice")).length.toBe(0)
      expect(drawedCards.filter(card => card == "leather")).length.toBe(0)
      expect(drawedCards.filter(card => card == "camel")).length.toBe(0)
      */
    })

  })