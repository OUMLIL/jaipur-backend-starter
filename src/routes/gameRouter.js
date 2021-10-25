import express from "express"
import * as gameService from "../services/gameService"
import * as dataBaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  // TODO return 400 if req.body.name doesn't exist
  console.log(req.body.name)
  const newGame = gameService.createGame(req.body.name)
  res.status(201).json(newGame)
})

router.get("/:id", function (req, res) {
  const game = gameService.getById(Number.parseInt(req.params.id))
  res.status(200).json(game)
})

router.get("/", function (req, res) {
  const games = gameService.getAll()
  res.status(200).json(games)
})

router.delete("/:id", function (req, res) {
  // TODO return 400 if req.body.name doesn't exist
  console.log(req.params.id)
  const newGame = dataBaseService.deleteGameById(req.params.id)
  res.status(200).json(newGame)
})

export default router