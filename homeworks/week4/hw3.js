const request = require('request')
const process = require('process')

const API_ENDPOINT = 'https://restcountries.eu/rest/v2'

const name = process.argv[2]

function main() {
  if (!name) {
    return console.log('請輸入國家名稱')
  }

  request(`${API_ENDPOINT}/name/${name}`, (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }
    let webData
    try {
      webData = JSON.parse(body)
    } catch (error) {
      console.log('error', error)
      return
    }
    const countryInformation = webData[0]
    if (response.statusCode === 404) {
      console.log('找不到國家資訊')
      return
    }

    console.log('============')
    console.log(`國家:${countryInformation.name}`)
    console.log(`首都:${countryInformation.capital}`)
    console.log(`貨幣:${countryInformation.currencies[0].code}`)
    console.log(`國碼:${countryInformation.callingCodes[0]}`)
  })
}

main()
