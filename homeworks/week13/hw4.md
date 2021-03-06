## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一種模組打包器，讓程式碼在瀏覽器上可以執行。

所謂的模組，就是寫好一整組常用或者好用的程式碼，讓自己或人家可以重複引入在其他檔案內做使用。
過去，這個模組功能根本無法在瀏覽器上實現，因為瀏覽器不支援。一般在瀏覽器上，要引入其他的 library 是直接用 `src="..."`，但當需要同時引入兩個以上的 library 時，可能會發生變數名稱有衝突的問題。
現在，官方雖已有推出模組化的規範，名為 ES Modules，但它仍有支援度不足的問題，例如 IE 瀏覽器就不行用。
因此，Webpack 的存在，原本是可以解決瀏覽器沒有辦法使用模組功能的問題，因為檔案經由 Webpack 打包處理過後，就可以在瀏覽器上執行了。那雖然現在官方已經推出模組規範，但支援度還不夠完整，所以 Webpack 仍然還是備受重用的開發工具之一。

除此之外，Webpack 強大的地方在於把模組化的概念延伸，任何資源都可以被它視為是一個模組，比如圖片、CSS，這些都可以用引進的方式被使用。為了支援這樣的功能，在 Webpack 中有許多 loader，比如 sass loader、babel loader，經過不同 loader 處理，Webpack 已經幫你把資源轉換成可以直接在瀏覽器上執行的檔案，不用自己額外去轉檔，這是使用 Webpack 最方便的地方。

所以可以不用它嗎？應該還是可以吧，端看你開發的需求，但因為他太好用了，所以很多時候應該無法抵抗用它的誘惑。


## gulp 跟 webpack 有什麼不一樣？

Gulp 是一種任務管理的工具，可以放進各種任務讓它幫你自動化執行，使用方式是引入內建或自己寫好的 plugin，用類似執行 function 的方式，執行所有被 plug 進來的任務。

Webpack 是幫你打包模組讓檔案可以在瀏覽器上執行的工具，打包前會用 loader 來轉換資料。

Gulp 跟 Webpack 的定位完全不同，只是兩者都有可以幫你處理同樣事情的工具，比如將檔案從 SASS 檔轉成 CSS 檔、將檔案從新語法轉成舊語法、壓縮檔案等，這讓人常搞混兩者是否一樣，但實際上，Gulp 可以涵蓋的任務範圍很廣，只要寫得出來的任務它都可以幫你執行。而 Webpack 主要實現的是幫你打包各種模組並且可以在瀏覽器上執行。


## CSS Selector 權重的計算方式為何？

權重就是優先權，權重高的CSS會優先對元素產生效果。如果是相同的權重，則後面的CSS會覆蓋前面的CSS。

### 權重比大小
!important > inline style > ID > Class/psuedo-class(偽類)/attribute（屬性選擇器） > Element > *

- `*` 的權重是 0-0-0-0
- 每一個 Element 的權重是 0-0-0-1，例如：`<div>`、`<p>`、`<h1>`
- 每一個 Class、psuedo-class、attribute 的權重是 0-0-1-0
	- psuedo-class是指 `:nth-child()`、`:hover` 這種元素
	- attribute是指 `[type:checkbox]` 這種元素
- 每一個 ID 的權重是 0-1-0-0
- 每一個 inline style 的權重是 1-0-0-0，指寫在 html 內的 style，例如：`<div style="..."></div>`
- !important 的權重是 1-0-0-0-0，權重視最高的，只有 !important 自己可以超過 !important。

### 權重算法

以下舉例來說：

```
<!DOCTYPE HTML> 
<html>
 <head>
   <meta charset="utf8" />
   <title>css selector test</title>
   <style>
    body div { 
      color: blue;
    }

    div.class {
      color: red;
    }

    #id {
      color: green
    }
   </style>
 </head>
 <body>
    <div class="class" id="id" style="color:orange">
      text
    </div>
 </body>
</html>
```

`body div` 
=> 共兩個 element，權重合計為 0-0-0-2

`div.class`
=> 一個 element 加上一個 class，權重合計為 0-0-1-1

`#id`
=> 一個 id，權重合計 0-1-0-0

`style="color:orange"`
=> inline style，權重 1-0-0-0

權重從最左邊依序往右比，數字越大就越優先，數字相等就會往右一個再做比較。

所以，最後 text 的字會顯示為**橘色**。






