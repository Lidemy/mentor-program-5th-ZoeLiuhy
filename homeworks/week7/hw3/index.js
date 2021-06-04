document.querySelector('.btn__add').addEventListener('click', () => {
  const newtodoValue = document.querySelector('.todo__input').value
  if (!newtodoValue) return
  const newtodo = document.createElement('div')
  newtodo.classList.add('todo__item')
  newtodo.innerHTML = `
        <input type='checkbox' class='todo__check' />
        <div class='todo__name'>${escapeHtml(newtodoValue)}</div>
        <button class='btn__delete'>delete</button>
  `
  document.querySelector('.todo__wholelist').appendChild(newtodo)
  document.querySelector('.todo__input').value = ''
})

document.querySelector('.todo__wholelist').addEventListener('click', (e) => {
  const { target } = e
  if (target.classList.contains('btn__delete')) {
    target.parentNode.remove()
    return
  }
  if (target.classList.contains('todo__check')) {
    if (target.checked) {
      target.parentNode.classList.add('todo__done')
    } else {
      target.parentNode.classList.remove('todo__done')
    }
  }
})

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;')
    .replace(/'/g, '&#039;')
}
