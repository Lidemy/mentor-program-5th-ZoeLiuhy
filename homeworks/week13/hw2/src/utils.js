export function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function appendCommentToDOM(commentDOM, comment, newCommentId, isPrepend) {
  const html = `
    <div class="card  mt-3">
      <div class="card-header">
        ${comment.id || newCommentId}
        ${escape(comment.nickname)}
      </div>
      <div class="card-body">
        <p class="card-text" style="white-space:pre-line">${escape(comment.content)}</p>
      </div>
    </div>
    `
  isPrepend ? commentDOM.prepend(html) : commentDOM.append(html)
}
