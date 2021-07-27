export function getForm(formClassName, commentsClassName) {
  return `
    <div>
      <form class="${formClassName}">
        <div class="card text-center" style="border:0px">
            <h5 class="card-title mt-5">WEEK 13 留言板</h5>
        </div>
        <div class="mb-3">
          <label class="form-label">暱稱</label>
          <input type="text" class="form-control" placeholder="請輸入暱稱" name="nickname"/>
        </div>
        <div class="mb-3">
          <label class="form-label">留言內容</label>
          <textarea class="form-control" rows="3" placeholder="請輸入留言" name="content"></textarea>
        </div>
        <button type="button" class="btn btn-success">提交</button>
      </form>
      <div class="${commentsClassName}">
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `
    <div class="d-grid gap-2 mt-3 loadmore">
      <button class="btn ${className} btn-outline-success" type="button">載入更多</button>
    </div>
    `
}
