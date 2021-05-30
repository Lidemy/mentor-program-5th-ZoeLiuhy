const request = require('request')
const process = require('process')

const API_URL = 'https://lidemy-book-store.herokuapp.com'

const action = process.argv[2]

if (action === 'list') {
  listBooks()
} else if (action === 'read') {
  readBook(process.argv[3])
} else if (action === 'delete') {
  deleteBook(process.argv[3])
} else if (action === 'create') {
  createBook(process.argv[3])
} else if (action === 'update') {
  updateBook(process.argv[3], process.argv[4])
} else {
  console.log('unknown action')
}

function listBooks() {
  request(`${API_URL}/books?_limit=20`, (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    let bookList
    try {
      bookList = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }

    for (let i = 0; i <= bookList.length - 1; i++) {
      console.log(`${bookList[i].id} ${bookList[i].name}`)
    }
  }
  )
}

function readBook(id) {
  request(`${API_URL}/books/${id}`, (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    let book
    try {
      book = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }
    console.log(book)
  }
  )
}

function deleteBook(id) {
  request.delete(`${API_URL}/books/${id}`, (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    let book
    try {
      book = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }
    console.log(response.statusCode)
    console.log(book, 'successfully deleted')
  }
  )
}

function createBook(name) {
  request.post({
    url: `${API_URL}/books`,
    form: {
      name
    }
  },
  (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    let book
    try {
      book = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }
    console.log('successfully created', book)
  }
  )
}

function updateBook(id, name) {
  request.patch({
    url: `${API_URL}/books/${id}`,
    form: {
      name
    }
  },
  (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    let book
    try {
      book = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }
    console.log(book, id, name)
  }
  )
}
