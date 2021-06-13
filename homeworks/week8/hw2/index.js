const API = 'https://api.twitch.tv/kraken'
const CLIENT_ID = 'cggmzqykplcvt5zqpl5aofaul8ljhp'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
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
const errorMessage = 'ERROR'

function responseTopGames(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API}/games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.setRequestHeader('Accept', ACCEPT)

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      callback(JSON.parse(request.response))
    } else {
      callback(errorMessage)
    }
  }
  request.onerror = () => {
    callback(errorMessage)
  }
  request.send()
}

function responseStream(gameName, callback) {
  const request2 = new XMLHttpRequest()
  request2.open('GET', `${API}/streams?game=${encodeURIComponent(gameName)}&limit=20`, true)
  request2.setRequestHeader('Client-ID', CLIENT_ID)
  request2.setRequestHeader('Accept', ACCEPT)
  request2.onload = function() {
    if (request2.status >= 200 && request2.status < 400) {
      callback(JSON.parse(request2.response).streams)
    } else {
      callback(errorMessage)
    }
  }
  request2.onerror = function(e) {
    callback(errorMessage)
  }
  request2.send()
}

responseTopGames((responseData) => {
  const topFiveGames = responseData.top
  for (const game of topFiveGames) {
    const addLi = document.createElement('li')
    addLi.innerHTML = `<a href='#'>${game.game.name}</a>`
    document.querySelector('.navbar__list').appendChild(addLi)
  }
  // 預設出現TOP 1 遊戲的stream
  changeGame(topFiveGames[0].game.name)
})

document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.parentNode.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText
    changeGame(gameName)
  }
})

function changeGame(gameName) {
  document.querySelector('h1').innerText = gameName
  document.querySelector('.stream__blocks').innerHTML = ''
  responseStream(gameName, (streamList) => {
    for (const stream of streamList) {
      appendStream(stream)
    }
    appendPlaceholder()
    appendPlaceholder()
  })
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
