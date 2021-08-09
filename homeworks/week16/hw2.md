### 程式碼
```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 輸出結果
印出
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

### 執行流程與原因

在範例中在 for 迴圈中是用 var 宣告 i 變數，因為 var 的作用域範圍在整個 function，所以 i 會成為全域變數。
可以把程式碼理解為：
```
var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. 宣告全域變數 i
2. 進入 for 迴圈
3. 第 0 圈，i = 0，`console.log('i: ' + i)` 被放到 call stack 執行，執行完後從 call stack 移除。
=> 印出 `i: 0`
4. `setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack 執行，呼叫瀏覽器設定 0*1000 ms 後到期的計時器，setTimeout 從 stack 上移除。
5. 倒數 0 ms 後時間到，`() => {console.log(i)}` 進入 task queue 中等待 stack 清空。
6. 第 1 圈，i ++，i = 1，檢查 i < 5 為 true，`console.log('i: ' + i)` 被放到 call stack 執行，執行完後從 call stack 移除。
=> 印出 `i: 1`
7. `setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack 執行，呼叫瀏覽器設定 1*1000 ms 後到期的計時器，setTimeout 從 stack 上移除。
8. 倒數 1000 ms 後時間到，`() => {console.log(i)}` 進入 task queue 中等待 stack 清空。
9. 第 2 圈，i ++，i = 2，檢查 i < 5 為 true，`console.log('i: ' + i)` 被放到 call stack 執行，執行完後從 call stack 移除。
=> 印出 `i: 2`
10. `setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack 執行，呼叫瀏覽器設定 2*1000 ms 後到期的計時器，setTimeout 從 stack 上移除。
11. 倒數 2000 ms 後時間到，`() => {console.log(i)}` 進入 task queue 中等待 stack 清空。
12. 第 3 圈，i ++，i = 3，檢查 i < 5 為 true，`console.log('i: ' + i)` 被放到 call stack 執行，執行完後從 call stack 移除。
=> 印出 `i: 3`
13. `setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack 執行，呼叫瀏覽器設定 3*1000 ms 後到期的計時器，setTimeout 從 stack 上移除。
14. 倒數 3000 ms 後時間到，`() => {console.log(i)}` 進入 task queue 中等待 stack 清空。
15. 第 4 圈，i ++，i = 4，檢查 i < 5 為 true，`console.log('i: ' + i)` 被放到 call stack 執行，執行完後從 call stack 移除。
=> 印出 `i: 4`
16. `setTimeout(() => {console.log(i)}, i * 1000)` 被放到 call stack 執行，呼叫瀏覽器設定 4*1000 ms 後到期的計時器，setTimeout 從 stack 上移除。
17. 倒數 4000 ms 後時間到，`() => {console.log(i)}` 進入 task queue 中等待 stack 清空。
18. 第 5 圈，i ++，i = 5，檢查 i < 5 為 false，跳出迴圈，call stack 清空。
19. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(i)}` 放到 call stack 中執行，呼叫 `console.log(i)`。
20. `console.log(i)` 被放到 call stack 中執行，此時 i = 5 ，執行完後從 call stack 移除。
=> 印出 5
21. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(i)}` 放到 call stack 中執行，呼叫 `console.log(i)`。
22. `console.log(i)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 5
23. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(i)}` 放到 call stack 中執行，呼叫 `console.log(i)`。
24. `console.log(i)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 5
25. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(i)}` 放到 call stack 中執行，呼叫 `console.log(i)`。
26. `console.log(i)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 5
27. Event Loop 看到 stack 已空，把 task queue 的 `() => {console.log(i)}` 放到 call stack 中執行，呼叫 `console.log(i)`。
28. `console.log(i)` 被放到 call stack 中執行，執行完後從 call stack 移除。
=> 印出 5
29. call stack 全空，結束。

