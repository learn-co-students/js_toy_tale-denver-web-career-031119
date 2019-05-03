const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
let likeBtn
const toyNameInput = document.querySelector('#toy-name-input')
const toyImageInput = document.querySelector('#toy-image-input')


getData()

function getData () {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(res => getToy(res))
    .then(() => addLikeEvent())
    .catch(error => console.log(error.message))
}

function addLikeEvent () {
  const likeBtn = document.querySelectorAll('.like-btn')
  likeBtn.forEach(function(button) {
    button.addEventListener('click', function() {
      const toyBtnId = button.id.split(' ')
      toyBtnId.pop()
      const toyId = parseInt(toyBtnId.pop())
      const toyName = toyBtnId.join(" ")
      const idPhrase = `${toyName} ${toyId} Likes`
      const toyLikes = document.querySelector(`#${CSS.escape(idPhrase)}`)
      const likeValue = parseInt(toyLikes.innerHTML[0])
      const newLike = likeValue + 1
      toyLikes.innerHTML = `${newLike} Likes`
      patchLikesBody(newLike, toyId)
    })
  })
}

function patchLikesBody (likes, id) {
  const body = {
    "likes": `${likes}`
  }
  patchLikes(likes, id, body)
}


function patchLikes (likes, id, body) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify(body)
  })
  .then(console.log)
  .catch(error => console.error(error.message))
}

function getToy(obj) {
  obj.forEach(toy => makeElement(toy))
}

function makeElement (toy) {
  div = document.createElement('div')
  div.className = "card"
  div.innerHTML = `<h2>${toy.name}</h2>
    <img class="toy-avatar" src=${toy.image}>
    <p id="${toy.name} ${toy.id} Likes">${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.name} ${toy.id} Like-Btn">Like <3</button>`
  toyCollection.appendChild(div)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }

})

toyForm.addEventListener('submit', makeToyBody)

function makeToyBody () {
  const body = {
    name: toyNameInput.value,
    image: toyImageInput.value,
    likes: 0
  }
  postToy(body)
}

function postToy (body) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(console.log)
  .catch(error => console.log(error.message))
}



// OR HERE!
