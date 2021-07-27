import $ from 'jquery' // eslint-disable-line import/no-extraneous-dependencies

export function getComments(apiUrl, siteKey, beforeId, cb) {
  let url = `${apiUrl}/api_list_comments.php?site_key=${siteKey}`
  if (beforeId) {
    url += '\'&before=\' + beforeId'
  }
  $.ajax({
    url
  }).done((data) => {
    cb(data)
  })
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data
  }).done((data) => {
    cb(data)
  })
}
