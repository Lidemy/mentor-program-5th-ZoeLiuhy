### 請解釋後端與前端的差異。

**前端**

靜態網站介面呈現、動畫與使用者互動功能，使用html、css、javascript程式。

**後端**

接收前端使用者的需求與指令並提供相對應的內容，目前有各種程式，如Python、Ruby、PHP等。



### 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

使用者 -(送出request)-> 硬體 --> 作業系統 --> 瀏覽器 --> Google server 雲端 --> 資料存到 data base --> 回傳 response --> 使用者收到搜尋結果

1. 瀏覽器送出關鍵字「JavaScript」到 google.com
2. 瀏覽器檢查 dns cache 有沒有 google.com
3. 有的話直接發送 request 給那個位置
4. 沒有的話呼叫 C 語言提供的 function（例如說 gethostbyname）
5. C 語言呼叫作業系統
6. 作業系統檢查 dns cache 有沒有 google.com
7. 有的話直接回傳位置
8. 沒有的話去 DNS Server（8.8.8.8）問說 google.com 在哪裡
9. DNS Server（8.8.8.8）回傳 172.217.160.78
10. 瀏覽器發送 request 給 172.217.160.78
11. Google server 收到資料，去資料庫查詢關鍵字，並且取得搜尋結果
12. Google server 把搜尋結果回傳
13. 瀏覽器顯示搜尋結果



### 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. 打開當前資料夾的視窗 --> `explorer .` (Windows) / `open .` (Mac)

2. 創建資料夾並前往該資料夾 --> `mkdir <dir name> && cd <dir name>`

3. 複製當下資料夾裡的所有檔案到指定資料夾 --> `cp * <dir name>/`
