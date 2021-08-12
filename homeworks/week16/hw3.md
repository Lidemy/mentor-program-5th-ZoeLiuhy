### 程式碼
```
1  var a = 1
2  function fn(){
3    console.log(a) //undefined
4    var a = 5
5    console.log(a) // 5
6    a++
7    var a
8    fn2()
9    console.log(a) // 20
10   function fn2(){
11     console.log(a) // 6
12     a = 20
13     b = 100
14   }
15 }
16 fn()
17 console.log(a) // 1
18 a = 10
19 console.log(a) // 10
20 console.log(b) // 100
```

### 輸出結果
印出
undefined
5
6
20
1
10
100

### 執行流程
1. 初始化 global Execution Contexts、global Variable Object
```
global EC: {
  VO: {
    a: undefined,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO] 
// function 也會被初始預設隱藏的屬性[[Scope]]

```
2. 執行第 1 行，宣告全域變數 a 並賦值 1 
```
global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [globalEC.VO] 
// function 也會被初始預設隱藏的屬性[[Scope]]
```
3. 執行第 16 行，呼叫function `fn`
4. 跳到第 2 行，執行 function `fn`，先初始化 `fn()`
```
fn EC: {
  AO: {
    a: undefined,
    fn2: function,
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
5. 執行第 3 行，因為 fnEC.AO 內 a 為 undefined => 印出 undefined
6. 執行第 4 行，fnEC.AO 內 a 被賦值 5
```
fn EC: {
  AO: {
    a: 5,
    fn2: function,
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
7. 執行第 5 行 => 印出 5
8. 執行第 6 行，a + 1 = 6
```
fn EC: {
  AO: {
    a: 6,
    fn2: function,
  },
  scopeChain: [fnEC.AO, fn.[[Scope]]] = [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
9. 執行第 7 行，宣告變數 a，但 VO 內已有變數 a 故忽略
10. 執行第 8 行，呼叫 function `fn2`
11. 跳到第 10 行執行 `fn2`，先初始化 `fn2()`
```
fn2 EC: {
  AO:{

  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fn EC: {
  AO: {
    a: 6,
    fn2: function,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
12. 執行第 11 行，因為 fn2EC.AO 內沒有 a 的值，往上一層找 fnEC.AO 的 a => 印出 6
13. 執行第 12 行，因為 fn2EC.AO 內沒有 a 的值，往上一層找 fnEC.AO 的 a，改變值為 20
```
fn2 EC: {
  AO:{

  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fn EC: {
  AO: {
    a: 20,
    fn2: function,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
14. 執行第 13 行，因為 fn2EC.AO 內沒有 b 的值，往上一層找 fnEC.AO 也沒有 b，再往上一層找 globalEC.VO 也沒有 b，所以直接在這一層宣告變數 b 並賦值 100
```
fn2 EC: {
  AO:{

  },
  scopeChain: [fn2EC.AO, fn2.[[Scope]]] = [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fn EC: {
  AO: {
    a: 20,
    fn2: function,
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[Scope]] = [fnEC.AO, globalEC.VO]

global EC: {
  VO: {
    a: 1
    fn: function
	b: 100
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
15. function fn2 執行完畢，fn2EC 消失
16. 執行第 9 行，找到 fnEC.AO 中的 a => 印出 20
17. function fn 執行完畢，fnEC 消失
18. 執行第 17 行，找到 globalEC.VO 中的 a => 印出 1
19. 執行第 18 行，改變 globalEC.VO 中 a 的值為 10
```
global EC: {
  VO: {
    a: 10
    fn: function
	b: 100
  },
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]
```
20. 執行第 19 行，找到 globalEC.VO 中的 a => 印出 10
21. 執行第 20 行，找到 globalEC.VO 中的 b => 印出 100
22. 執行完畢，globalEC 消失
