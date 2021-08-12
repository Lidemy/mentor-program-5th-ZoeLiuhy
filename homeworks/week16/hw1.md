### 程式碼
```console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 輸出結果
印出 
1
3
5
2
4

### 執行流程
1.  `console.log(1)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 1
2. `setTimeout(() => {console.log(2)}, 0)` 被放到 call stack 中執行，呼叫瀏覽器設定 0 ms 後到期的計時器，setTimeout 從 stack 上移除。
3. 倒數0 ms 後時間到，`() => {console.log(2)}` 進入 task queue 中等待 stack 清空。
4. `console.log(3)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 3
5. `setTimeout(() => {console.log(4)}, 0)` 被放到 call stack 中執行，呼叫瀏覽器設定 0 ms 後到期的計時器，setTimeout 從 stack 上移除。
6. 倒數 0 ms 後時間到，`() => {console.log(4)}` 進入 task queue 中，排在 `() => {console.log(2)}` 後面，等待 stack 清空。
7. `console.log(5)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 5
8. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(2)}` 放到 call stack 中執行，呼叫 `console.log(2)` 。
9. `console.log(2)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 2
10. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(4)}` 放到 call stack 中執行，呼叫 `console.log(4)` 。
11. `console.log(4)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 4
12. call stack 全空，結束。

