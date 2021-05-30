const request = require('request')

const CLIENT_ID = 'cggmzqykplcvt5zqpl5aofaul8ljhp'
const API_URL = 'https://api.twitch.tv/kraken'

request({
  url: `${API_URL}/games/top`,
  headers: {
    'Client-ID': CLIENT_ID,
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}, (err, res, body) => {
  if (err) {
    return console.log('Error', err)
  }

  const data = JSON.parse(body)
  const games = data.top
  for (const game of games) {
    console.log(`${game.viewers} ${game.game.name}`)
  }
})
