import express from "express"
import * as gameService from "../services/gameService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  // TODO return 400 if req.body.name doesn't exist
  const newGame = gameService.createGame(req.body.name)
  res.status(201).json(newGame)
})

router.get("/", function (req, res) {
  const games = gameService.getAll()
  res.status(200).json(games)
})

export default router
