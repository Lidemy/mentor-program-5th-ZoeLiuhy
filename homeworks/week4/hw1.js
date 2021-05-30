const request = require('request')

const API_URL = 'https://lidemy-book-store.herokuapp.com'

request(`${API_URL}/books?_limit=10`, (error, response, body) => {
  if (error) {
    console.log('error', error)
    return
  }

  let bookslist
  try {
    bookslist = JSON.parse(body)
  } catch (error) {
    console.log('error', error)
    return
  }

  for (let i = 0; i <= bookslist.length - 1; i++) {
    console.log(`${bookslist[i].id} ${bookslist[i].name}`)
  }
}
)
