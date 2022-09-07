import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })
const app = express()
app.use(express.json())
app.use(cors())

const port = 3456

const getMuseum = db.prepare('SELECT * FROM museum')

const getWorksForMuseum = db.prepare(`
  SELECT * FROM work WHERE workId = ?
  `)

const getMuseumById = db.prepare(`
  SELECT * FROM museum WHERE id = ?
  `)

app.get('/museums', (req, res) => {
  const museums = getMuseum.all()
  for (const museum of museums) {
    const works = getWorksForMuseum.all(museum.id)
    museum.works = works
  }
  res.json(museums)
})

app.get('museum/:id', (req, res) => {
  const museum = getMuseumById.get(req.params)
  res.send(museum)
})

const getWorkById = db.prepare(`
  SELECT * FROM work WHERE id = ?
  `)

const getWork = db.prepare(`
  SELECT * FROM work
  `)

app.get('/work', (req, res) => {
  const work = getWork.all()
  res.json(work)
})

app.get('/work/:id', (req, res) => {
  const work = getWorkById.get(req.params.id)
  res.json(work)
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})
