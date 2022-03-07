import express from 'express'
import path from 'path'

const app = express()
const Path = path()

app.use("/static", express.static(Path.resolve("./", "src")))

app.get("/*", (req, res) => {
  res.sendFile(Path.resolve("./", "index.html"))
})

export const handler = app