document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  let hasError = false
  const returnData = {}
  const allData = document.querySelectorAll('.question__required')
  for (const data of allData) {
    const radios = data.querySelectorAll('input[type=radio]')
    const input = data.querySelector('input[type=text]')
    const email = data.querySelector('input[type=email]')
    const mobile = data.querySelector('input[type=mobile]')
    let isValid = true
    if (input) {
      returnData[input.name] = input.value
      if (!input.value) {
        isValid = false
      }
    } else if (email) {
      returnData[email.name] = email.value
      if (!email.value) {
        isValid = false
      }
    } else if (mobile) {
      returnData[mobile.name] = mobile.value
      if (!mobile.value | mobile.value.length < 10) {
        isValid = false
      }
    } else if (radios.length) {
      isValid = [...radios].some((radio) => radio.checked)
      if (isValid) {
        const radiosName = data.querySelector('input[type=radio]:checked')
        returnData[radiosName.name] = radiosName.value
      }
    } else {
      continue
    }

    if (!isValid) {
      data.classList.remove('hide-error')
      hasError = true
    } else {
      data.classList.add('hide-error')
    }
  }

  if (!hasError) {
    alert(JSON.stringify(returnData))
  }
})
