const request = require('request')
const process = require('process')

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com'

const action = process.argv[2]

if (action === 'list') {
  bookList()
} else if (action === 'read') {
  bookRead(process.argv[3])
} else if (action === 'delete') {
  bookDelete(process.argv[3])
} else if (action === 'create') {
  bookCreate(process.argv[3])
} else if (action === 'update') {
  bookUpdate(process.argv[3], process.argv[4])
} else {
  console.log('unknown action')
}

function bookList() {
  request(`${API_ENDPOINT}/books?_limit=20`, (error, response, body) => {
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

function bookRead(id) {
  request(`${API_ENDPOINT}/books/${id}`, (error, response, body) => {
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

function bookDelete(id) {
  request.delete(`${API_ENDPOINT}/books/${id}`, (error, response, body) => {
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

function bookCreate(name) {
  request.post({
    url: `${API_ENDPOINT}/books`,
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

function bookUpdate(id, name) {
  request.patch({
    url: `${API_ENDPOINT}/books/${id}`,
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
