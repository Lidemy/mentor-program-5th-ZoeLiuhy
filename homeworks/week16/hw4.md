### 程式碼
```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello

obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

### 輸出結果
印出
2
2
undefined

### 原因

1. `obj.inner.hello()`
a. `obj.inner` 是一個物件，hello 是這個物件中的 function。當呼叫 `obj.inner.hello()` 時會執行 `obj.inner` 這個物件裡的 hello function，這個 function 會印出 this 的 value，這時的 this 是指向 `obj.inner` 這個物件，故 `obj.inner.value` 為 2，印出 => 2
b. 用 call function 的形式來看：
```
obj.inner.hello()
= obj.inner.hello.call(obj.inner)
```
在`call()`內傳的第一個值，就會是 hello function 中的 this，因此 this 等於 `obj.inner`，看回程式碼：
```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: { 
    value: 2,
    hello: function() {
      console.log(this.value) // 可看成 console.log(obj.inner.value) = 2
    }
  }
}
```
因此，得到結論：`obj.inner.hello()` 為 2

2. `obj2.hello()`
用 call function 的形式來看：
```
obj2.hello()
= obj2.hello.call(obj2)
= obj2.hello.call(obj.inner) // 因為 const obj2 = obj.inner
```
在`call()`內傳的第一個值，就會是 hello function 中的 this，因此 this 等於`obj.inner`，跟上一題的 this 指向同個位置 => 印出 2

3. `hello()`
a. 直接呼叫 function hello 等於是執行 `function() {console.log(this.value)}` 這段程式，此時 this 不指向任何東西
b. 用 call function 來看：
```
hello() = hello.call(undefined)
```
在嚴格模式('use strict')下 => 印出 undefined
在非嚴格模式下，瀏覽器的 this 預設值為 window；在 node.js 的預設值為 global
