## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### 什麼是 DNS？
DNS (Domain Name System) 是網域名稱系統，透過這個系統將人們可讀的網域名稱對應到 IP 位址，讓電腦可以連線到該網頁。比如一個網域名稱為 www.example.com，透過 DNS 服務可以轉換得知其 IP 位址為 192.0.2.44，將 IP 位址傳給瀏覽器後，瀏覽器才幫你連線到 www.example.com 的網頁。

### Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

#### 對 Google 的好處
可蒐集大量使用者資料，用來分析或改善搜尋引擎的功能，甚至可用這些資料去開發更多其他工具。

#### 對大眾的好處
有較佳且較安全的使用者體驗，因為 Google Public DNS 會自動更新最新的 IP 資訊，減少網址重導，並且自動篩選、過濾惡意網站，避免使用者被導入釣魚網站等問題。


## 什麼是資料庫的 lock？為什麼我們需要 lock？

LOCK 是一種鎖，可以鎖定資料，把不應進行的指令暫停，讓應該進行的指令先執行，避免資料發生錯誤。
當不同的使用者在同一時間發出同樣的 request 要存取某樣東西時，會發生 race condition 的情況，加上 lock 可以鎖定，讓一個 request 執行時，另一個 request 停留在被 lock 住的地方等待，等原本的 request 跑完以後才能繼續執行，避免資料衝突導致資料錯誤情況。

例如在購票的網站，如果沒有在 query 上加 lock，可能會發生當庫存僅剩一張票，而消費者又同時按下購票，系統讓兩個 request 同時進行並完成，結果票其實已經超賣了的情況。


## NoSQL 跟 SQL 的差別在哪裡？

- 資料庫型態
NoSQL 是一種非關聯資料庫，SQL 則相反
- 資料存取類型
NoSQL 存取量大且沒有固定結構的資料，比如 log，存取格式為每一個 key 對應到很多 value (key-value)；SQL 存的資料每一欄位需同為字串、數字，如果要加入新的資料，整個結構都要重新做調整
- JOIN
NoSQL 不支援 JOIN 用法，因為沒有固定結構，不一定特定欄位都有資料；SQL 反之


## 資料庫的 ACID 是什麼？

ACID 是每筆交易 (transaction) 要符合的四特性：

**A** 原子性 (atomicity) => 整筆交易的執行不可分割，只有全失敗或者全成功兩種結果。比如要轉帳 200 元，A 帳戶有扣款，B 帳戶卻沒有入帳，這樣這筆交易就算是全失敗。

**C** 一致性 (consistency) => 交易前與後，維持資料的一致性。比如交易前 A 帳戶有 200 元，轉帳 200 元後，A 帳戶應為 0 元，B 帳戶增加 200 元，前後資料要一致。

**I** 隔離性 (isolation) => 不能同時間同修改或寫入同一個資料，這樣多筆交易才不會相互影響。

**D** 持久性 (durability) => 交易成功後，寫入的資料會保存，不會不見，也不會因系統重啟而有改變。