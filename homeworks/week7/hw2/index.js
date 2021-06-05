document.querySelector('.faq-block').addEventListener('click', (e) => {
  const clickQuestion = closestRecursive(e.target, 'question')
  if (clickQuestion) {
    clickQuestion.classList.toggle('rollup')
  }
  function closestRecursive(node, className) {
    if (!node || !node.classList) return null
    if (node.classList.contains(className)) {
      return node
    }
    return closestRecursive(node.parentNode, className)
  }

  /*
  function closest(node, className) {
    while (node && node.classList) {
      if (node.classList.contains(className)) {
        return node
      }
      node = node.parentNode
    }
  }
  const clickQuestion = e.target.closest('.question')
  if (clickQuestion) {
    clickQuestion.classList.toggle('rollup')
  */
})
