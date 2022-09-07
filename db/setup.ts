import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })

const museums = [
  {
    name: 'Museum of Modern Art',
    city: 'New York City'
  },
  {
    name: 'National Gallery of Art',
    city: 'Washington, D.C.'
  },
  {
    name: 'The Louvre',
    city: 'Paris'
  },
  {
    name: 'The British Museum',
    city: 'London'
  }
]

const works = [
  {
    workId: 1,
    name: 'The Persistence of Memory',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dal%C3%AD%2C_Salvador_-_The_Persistence_of_Memory.jpg/800px-Dal%C3%AD%2C_Salvador_-_The_Persistence_of_Memory.jpg'
  },
  {
    workId: 2,
    name: 'The Starry Night',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/800px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
  },
  {
    workId: 2,
    name: 'The Scream',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Edvard_Munch%2C_1893_-_The_Scream_-_Google_Art_Project.jpg/800px-Edvard_Munch%2C_1893_-_The_Scream_-_Google_Art_Project.jpg'
  },
  {
    workId: 3,
    name: 'The Mona Lisa',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
  },
  {
    workId: 4,
    name: 'Rosetta Stone',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rosetta_Stone.jpg/800px-Rosetta_Stone.jpg'
  },
  {
    workId: 4,
    name: 'Elgin Marbles',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rosetta_Stone.jpg/800px-Rosetta_Stone.jpg'
  }
]





const createMuseumTable = db.prepare(`
CREATE TABLE IF NOT EXISTS museum (
    id INTEGER,
    name TEXT,
    city TEXT,
    PRIMARY KEY (id)
);`)

createMuseumTable.run()



const deleteWorkTable = db.prepare(`
DROP TABLE IF EXISTS work
`)

deleteWorkTable.run()

const createWorkTable = db.prepare(`
CREATE TABLE IF NOT EXISTS work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workId INTEGER,
    name TEXT,
    picture TEXT,
    FOREIGN KEY (workId) REFERENCES museum (id)
);`)

createWorkTable.run()

const DeleteWork = db.prepare(`
DELETE FROM work;
`)

DeleteWork.run()



const createMuseum = db.prepare(`
INSERT INTO museum (name,city) VALUES (?,?);
`)

const createWork = db.prepare(`
INSERT INTO work (name,picture,workId) VALUES (@name,@picture,@workId);
`)

for (let museum of museums) {
  createMuseum.run(museum.city, museum.name)
}

for (let work of works) {
  createWork.run(work)
}
