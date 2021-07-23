import $ from 'jquery' // eslint-disable-line import/no-extraneous-dependencies
import { getComments, addComments } from './api'
import { appendCommentToDOM } from './utils'
import { getForm, getLoadMoreButton } from './templates'

// 初始化
export default function init(options) {
  const { siteKey } = options
  let containerElement = null
  let commentDOM = null
  let hasMoreComment = true
  const loadMoreButtonClassName = `${siteKey}_btn_loadmore`
  const loadMoreButtonSelector = `.${siteKey}_btn_loadmore'`
  const commentsClassName = `${siteKey}_comments`
  const commentsSelector = `.${siteKey}_comments`
  const formClassName = `${siteKey}_add_comment_form`
  const formSelector = `.${siteKey}_add_comment_form`
  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))

  // 載入留言
  commentDOM = $(commentsSelector)
  getAllComments()

  // 載入更多留言
  $(commentsSelector).on('click', 'button', () => {
    getAllComments()
  })

  // 新增留言
  $(formSelector).on('click', 'button', (e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    addComments((apiUrl, siteKey, newCommentData, data) => {
      newCommentData = {
        site_key: siteKey,
        nickname: nicknameDOM.val(),
        content: contentDOM.val()
      }
      if (!data.status) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      const newCommentId = data.new_comment_id
      appendCommentToDOM(commentDOM, newCommentData, newCommentId, true)
    })
  })

  function getAllComments() {
    const commentDOM = $(commentsSelector)
    $(loadMoreButtonSelector).hide()
    if (!hasMoreComment) {
      return
    }
    getComments((apiUrl, siteKey, lastCommentId, data) => {
      if (!data.status) {
        alert(data.message)
        return
      }
      const comments = data.discussions
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment, false)
      }
      const { length } = comments
      if (length < 5) {
        hasMoreComment = false
        $(loadMoreButtonSelector).hide()
      } else {
        lastCommentId = comments[length - 1].id
        if (lastCommentId === 1) {
          hasMoreComment = false
          $(loadMoreButtonSelector).hide()
          return
        }
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreButtonClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
