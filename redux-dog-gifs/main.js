const { createStore } = Redux;

const initialState = {
  pups: [
    {
      rating: '5',
      url: 'https://media.giphy.com/media/O3iWjzootMuQw/giphy.gif'
    }
  ]
}

// Reducer

const gifReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PUP:
      const newPupArray = state.pups.concat(action.newPup)
      return Object.assign({}, state, {
        pups: newPupArray
      })
    default:
      return state;
  }
}

// JS to access new pup form

const newPupForm = document.getElementById('new-pup-form')

// Declare action type

const ADD_PUP = 'ADD_PUP'

// Submits form and dispatches add action

newPupForm.addEventListener('submit', () => {
  event.preventDefault();
  const gifUrl = document.getElementById('gif-url').value
  const gifRating = document.getElementById('gif-rating').value
  document.getElementById('gif-url').value = ''
  document.getElementById('gif-rating').value = ''
  const newPup = { url: gifUrl, rating: gifRating }
  store.dispatch(
    {
      type: ADD_PUP,
      newPup: newPup
    }
  )
})

// Sets up store
const store = createStore(gifReducer);

// Renders list of gifs to page
const gifList = document.getElementById('gif-list')

const render = () => {
  let pupsList = ''
  store.getState().pups.forEach(function(pup) {
    pupsList += `<li><img src=${pup.url} /> Rating: ${pup.rating}</li>`
  })
  gifList.innerHTML = pupsList
}

render();
store.subscribe(render);
