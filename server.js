// Require all our libraries including express
// which will be used for our backend
const express = require('express')
const app = express()
const port = 3000
// const cors = require('cors')
const favs = require('./favs.json');
let bodyParser = require('body-parser');

// Use the body parser so we can read incoming json
app.use(bodyParser.json())

// All use cors to deal with security
// app.use(cors({
//   origin: '*'
// }));

// When frontend request tweets, send them the favs json
app.get('/tweets', function (req, res) {
  res.json(favs)
})

// when a delete request is made go through favs and delete
// the entry with the given id
app.delete('/tweets', (req, res) => {

  // Loop through to find which tweet to delete
  for (let i = 0; i < favs.length; i++) {
    if (favs[i].id_str == req.body.tweetID) {
      favs.splice(i, 1)
    }
  }
  res.json("Done")
})

// When a post request is made push the given tweet to favs
app.post('/tweets', (req, res) => {
  favs.push(
    req.body
  )
  res.json("Done")

})

// WHen a post request to update name is received
// loop through and find name to replace
app.post('/name', (req, res) => {
  for (let i = 0; i < favs.length; i++) {
    if (favs[i].user.name == req.body.pastName) {
      favs[i].user.name = req.body.newName
    }
  }
  res.json("Done")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

