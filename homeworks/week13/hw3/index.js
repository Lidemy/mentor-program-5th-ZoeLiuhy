const API = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'cggmzqykplcvt5zqpl5aofaul8ljhp'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const HEADER = new Headers({
  'Client-ID': CLIENT_ID,
  Accept: ACCEPT
})
const streamTemplate = `
  <div class='stream__block'>
    <div class='stream__preview'>
      <img src='$streamPreview'/>
    </div>
    <div class='stream__resource'>
      <div class='stream__gamerPic'>
          <img src='$gamerPic'>
      </div>
      <div class='stream__videoResource'>
        <div class='stream__videoName'>$videoName</div>
        <div class='stream__videoChannel'>$channelName</div>
      </div>
    </div>
  </div>
`

getGames()
async function getGames() {
  let gamesData
  try {
    gamesData = await responseTopGamesData()
  } catch (error) {
    console.log('Error:', error)
  }

  const topFiveGames = gamesData.top
  for (const game of topFiveGames) {
    const addLi = document.createElement('li')
    addLi.innerHTML = `<a href='#'>${game.game.name}</a>`
    document.querySelector('.navbar__list').appendChild(addLi)
  }
  // 預設出現TOP 1 遊戲的stream
  changeGame(topFiveGames[0].game.name)
}

async function responseTopGamesData() {
  const response = await fetch(`${API}/games/top?limit=5`, {
    headers: HEADER
  })
  try {
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error:', error)
  }
}

function changeGame(gameName) {
  document.querySelector('h1').innerText = gameName
  document.querySelector('.stream__blocks').innerHTML = ''
  getStreams()
  async function getStreams() {
    try {
      const streamData = await responseStreamData(gameName)
      const { streams } = streamData
      for (const stream of streams) {
        appendStream(stream)
      }
      appendPlaceholder()
      appendPlaceholder()
    } catch (error) {
      console.log('Error:', error)
    }
  }
}

async function responseStreamData(gameName) {
  const response = await fetch(`${API}/streams?game=${encodeURIComponent(gameName)}&limit=20`, {
    headers: HEADER
  })
  try {
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error:', error)
  }
}

function appendStream(stream) {
  const addStream = document.createElement('div')
  document.querySelector('.stream__blocks').appendChild(addStream)
  addStream.outerHTML = streamTemplate
    .replace('$streamPreview', stream.preview.large)
    .replace('$gamerPic', stream.channel.logo)
    .replace('$videoName', stream.channel.status)
    .replace('$channelName', stream.channel.name)
}

function appendPlaceholder() {
  const placeholder = document.createElement('div')
  placeholder.classList.add('stream__block__empty')
  document.querySelector('.stream__blocks').appendChild(placeholder)
}

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.parentNode.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})
