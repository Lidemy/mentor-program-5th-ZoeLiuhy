## 請以自己的話解釋 API 是什麼

我的理解是，API 是一種介面，可以把不同程式串接起來，就像登入 HackMD 時，可以選擇透過 Google 登入、透過 GitHub 登入或者透過 Facebook 登入等，就是把 Google 、 GitHub 跟 FB 的登入功能串接到 Hackmd 的網站登入頁面中。

不同程式可以透過 API 的串接來交換資料。當 A 程式需要 B 程式幫他做某件事或拿取 B 程式的某些資料時，中間會透過 API 來幫忙溝通。如此 A 程式需要知道：

- 要如何向 B 程式發出 Request 才能獲取我要的資料？
- 成功獲取資料時 API 會回復什麼？失敗時會回復什麼？

而這些答案會寫在 API 的說明文件中，只要找到 API 在哪裡、看懂 API 怎麼用，就可以把 B 程式的功能串接到 A 程式中。

（以上如有錯誤再煩請指教，謝謝！）

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
### 常見的Status Code
- 2xx　是成功回應
- 3xx　是重新導向
- 4xx　是用戶端錯誤
- 5xx　是伺服器端錯誤

### 其他
- 403 Forbidden：用戶端沒有權限，所以伺服器拒絕執行與回應
- 401 Unauthorized：未認證，需要登入或驗證身分
- 408 Request Timeout：請求逾時，用戶端請求傳送到該網站伺服器花的時間比該網站的伺服器準備等待的時間要長
- 418 I’m a teapot：我是一個茶壺，不會泡咖啡
（1998 年訂的愚人節笑話（收錄在 RFC 2324），指當一個控制茶壺的伺服器收到要求煮咖啡的 Request 時候，要回應 418，告訴使用者這是一個茶壺不是咖啡機） 哈哈

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### API文件
BASE URL: https://lekkerrestaurantslist.com

|說明|Method|Path|參數|範例|
|---|---|---|---|---|
|回傳所有餐廳資料|GET|/restaurants|_limit:限制回傳資料數量|/restaurants?_limit=10|
|回傳單一餐廳資料|GET|/restaurants/:id|None|/restaurants/3|
|刪除餐廳資料|DELETE|/restaurants/:id|None|None|
|新增餐廳資料|POST|/restaurants|name: 餐廳名|None|
|更改餐廳資料|PATCH|/restaurants/:id|name: 餐廳名|None|


