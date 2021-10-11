import request from "supertest"
import app from "../app"
import lodash from "lodash"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

jest.mock("loadash")
loadash.shuffle.mockimplementation((x) => x)

// TODO: Mock lodash shuffle

describe("Game router", () => {
  test("should create a game", async () => {
    const response = await request(app).post("/games").send({ name: "test" })
    // TODO
  })
})