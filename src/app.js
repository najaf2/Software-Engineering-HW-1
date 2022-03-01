// Containers to put HTML in
const tweetsContainer = document.querySelector("#tweetsContainer")
const usersContainer = document.querySelector("#usersList")

// Buttons
const hideBtn = document.querySelector('#hide')
const showBtn = document.querySelector('#show')
const showUsersBtn = document.querySelector('#showUsersBtn')
const hideUserBtn = document.querySelector('#hideUsersBtn')

// Api call buttons
const createTweetBtn = document.querySelector('#createTweetBtn')
const deleteTweetBtn = document.querySelector('#deleteTweetBtn')
const getTweetBtn = document.querySelector('#getTweetBtn')
const updateNameBtn = document.querySelector('#updateNameBtn')

// textBoxes
const idText = document.querySelector('#idText')
const textText = document.querySelector('#textText')
const nameText = document.querySelector('#nameText')
const newNameText = document.querySelector('#newNameText')

let tweets = []
let users = []
loadTweets()


// Function to load in all the tweets into the tweets arr
// Also calls the display function
function loadTweets() {
  tweets = []
  fetch("http://localhost:3000/tweets")
    .then(response => { return response.json() })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        tweets.push(data[i])
      }

      display()
    })
    .catch(err => console.log(err))
}

// Adds all tweets to the html, assigning the correct
// css ids
// Also adds in delete and update buttons to each tweet
function display() {
  tweetsContainer.innerHTML = ""
  for (let tweet of tweets) {
    // Create a div item to store the tweet
    let currTweet = document.createElement('div')
    currTweet.id = "tweet"
    currTweet.innerHTML = tweet.text

    // Add in delete and update buttons to align with the tweet
    let deleteBtn = document.createElement('button')
    deleteBtn.id = "deleteBtn"
    deleteBtn.textContent = "DELETE"

    // Add functionality to the buttons
    deleteBtn.addEventListener('click', _ => {
      fetch("http://localhost:3000/tweets", {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "tweetID": tweet.id
        })
      })
        .then(data => {
          loadTweets()
        })
        .catch(err => console.log(err))


    })

    // Attach timestamp to tweet
    let timestamp = document.createElement('div')
    timestamp.textContent = tweet.created_at
    timestamp.id = "timestamp"


    // Append all the btns to the div
    currTweet.appendChild(deleteBtn)
    currTweet.appendChild(deleteBtn)
    currTweet.appendChild(timestamp)


    // Append all of that to the tweets contaner div
    tweetsContainer.appendChild(currTweet)
  }
}

// Hide all btn event listener
hideBtn.addEventListener('click', () => {
  tweets = []
  tweetsContainer.innerHTML = ""
})

// Show all btn event listner
showBtn.addEventListener('click', () => {
  tweets = []
  loadTweets()
})

showUsersBtn.addEventListener('click', () => {
  // Delete all the users already in the array
  users = []

  // Fetch all the users in the server favs json
  fetch("http://localhost:3000/tweets")
    .then(response => { return response.json() })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        users.push(data[i].user.name + " ID: " + data[i].user.id)
      }

      // Display them on the html
      displayUsers()
    })
    .catch(err => console.log(err))
})

// Hide the users (delete users htmk)
hideUserBtn.addEventListener('click', () => {
  usersContainer.innerHTML = ""
})

// Display the users in the html
function displayUsers() {
  usersContainer.innerHTML = ""
  for (let user of users) {
    usersContainer.innerHTML += user + "<br>"
  }
}


// Restfult Api Buttons

// pass in a tweet and id as well as a created_at to create a tweet
createTweetBtn.addEventListener('click', _ => {
  fetch("http://localhost:3000/tweets", {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "created_at": new Date().toLocaleString(),
      "id": idText.value,
      "text": textText.value,
      "id_str": idText.value.toString()
    })
  })
    // Then load the tweets
    .then(data => {
      loadTweets()
    })
    .catch(err => console.log(err))


})

// Show a tweet based on a given id
getTweetBtn.addEventListener('click', () => {
  fetch("http://localhost:3000/tweets")
    .then(response => { return response.json() })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == idText.value) {
          tweets.push(data[i])
          // Then display that tweet
          display()
          break
        }
      }
    })
    .catch(err => console.log(err))
})

// give in the the current name and new name
// so the server can update them
updateNameBtn.addEventListener('click', _ => {
  fetch("http://localhost:3000/name", {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "pastName": nameText.value,
      "newName": newNameText.value
    })
  })
    .then(data => {
      loadTweets()
    })
    .then(data => {
      users = []

      fetch("http://localhost:3000/tweets")
        .then(response => { return response.json() })
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            users.push(data[i].user.name + " ID: " + data[i].user.id_str)
          }

          displayUsers()
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))


})

// delete a tweet given an id
deleteTweetBtn.addEventListener('click', _ => {
  fetch("http://localhost:3000/tweets", {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "tweetID": idText.value.toString()
    })
  })
    .then(data => {
      loadTweets()
    })
    .catch(err => console.log(err))
})