const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMessage = '系統不穩定，請再試一次。'
function responsePrize(callback) {
  const request = new XMLHttpRequest()
  request.open('GET', API_URL, true)
  request.addEventListener('load', (e) => {
    if (request.status < 200 && request.status >= 400) {
      callback(errorMessage)
    } else {
      let responseData
      try {
        responseData = JSON.parse(request.response)
      } catch (error) {
        callback(errorMessage)
        return
      }
      if (!responseData) {
        callback(errorMessage)
        return
      }
      callback(null, responseData)
    }
  })
  request.addEventListener('onerror', (e) => {
    console.log(errorMessage)
  })
  request.send()
}

document.querySelector('.submit__btn').addEventListener('click', (e) => {
  responsePrize((error, responseData) => {
    if (error) {
      alert(errorMessage)
      return
    }

    const prizeList = {
      FIRST: {
        title: '恭喜你中頭獎了！日本東京來回雙人遊！',
        className: 'firstPrize'
      },
      SECOND: {
        title: '二獎！90 吋電視一台！',
        className: 'secondPrize'
      },
      THIRD: {
        title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
        className: 'thirdPrize'
      },
      NONE: {
        title: '銘謝惠顧',
        className: 'nonePrize'
      }
    }

    const { className, title } = prizeList[responseData.prize]
    document.querySelector('.section__result').classList.add(className)
    document.querySelector('.eventresult__title').innerText = title
    document.querySelector('.section').classList.add('hide')
    document.querySelector('.section__result').classList.remove('hide')
  })
})
