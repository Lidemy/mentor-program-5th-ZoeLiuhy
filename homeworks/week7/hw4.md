## 什麼是 DOM？

DOM 是 **瀏覽器** 與 **JS** 溝通的橋樑，讓我們可以直接撰寫 JS 文件來改變瀏覽器上畫面的呈現方式。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

順序是，先捕獲再冒泡。

### 捕獲
DOM 事件傳遞機制中，當根節點開始往下尋找目標 `target` 的過程。

### 冒泡
當找到 `target` 後，原路返回根節點的過程。


## 什麼是 event delegation，為什麼我們需要它？

事件代理的由來，是因為在事件傳遞機制中，尋找子元素一定會經過他的父元素，所以當把事件監聽加在父元素身上，就是讓父元素來代理子元素的事件，也就是所謂的事件代理。

當子元素數量很多時，在每一個子元素皆新增監聽會對效能不好，且有些子元素是動態新增，例如本周第三個作業 To do List，會無法監聽新增的子元素。所以為了提高效能，還有可以讓新增的子元素加上監聽，將監聽事件加在父元素才是較有效的做法。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

### `event.preventDefault()` 
**取消預設行為**

可阻止事件繼續傳遞，但當前這次仍會執行，之後的停止。

例如：當有一個連結，點選後的預設行為應該會自動帶我們到另外的網頁，但加了一行 `event.preventDefault()` ，就會取消這次的預設行為，不會前往另外的網頁。

### `event.stopPropagation()` 
**取消事件傳遞**

立馬阻止事件傳遞，包含當前這次的事件也會停止。

例如：根據事件傳遞的原則，若有兩個重疊的 `<div>` ，當點選內層的 `<div>` 時，外層的 `<div>` 也會被觸發，若只想要觸發內層的 `<div>` ，可以加上 `event.stopPropagation()` 來阻止事件傳遞。
