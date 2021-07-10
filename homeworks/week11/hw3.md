## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
雜湊與加密兩者其一的差別在於還原的難易程度，加密可以進行解密，就會原封不動知道密碼為何，但雜湊(hash)是無法還原的。另外一個差別在於，加密是一對一的關係，把加密過後的密碼解密，密碼就被知道了。但是雜湊是多對一的關係，所以比較難從"一"逆推回去是多個裡面的哪一個。因此，適合將密碼雜湊過後再存進資料庫裡面，這樣資料庫被看光光時，也不會很容易就獲取使用者的密碼。

## `include`、`require`、`include_once`、`require_once` 的差別
`include`、`require`的差異主要在如何處理失敗，`include` 會產生一個警告，`require` 會直接停止程式繼續執行，所以如果是想在檔案遺失的時候停止處理頁面，使用 `require` 比較適合，所以我們才會在做留言板時，把確認是否為管理者的檔案用 `require` 放進 PHP，因為判斷權限的檔案壞了，頁面要完全無法執行才能避免被訪客竄改跟竊取資料吧。

至於後面加個 once，就如同它字面上的意思，如果檔案在之前已經在該程式中的其它地方匯入過了，就不會再重複匯入同樣的內容。主要應該是因為 PHP 不能重複宣告同樣名稱的函式，所以在第一次匯入檔案裡面已經宣告的函式，如果在同個程式中重複匯入就會發生錯誤。

## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
這是一種注入惡意構造的字串，讓 SQL 指令變成截然不同的意思的攻擊方式。
例如，在留言板上的留言欄位中，輸入惡意重組的 SQL 字串：
```
"), ("admin", (select password from users where id=54))#
```

到 `handle_add_comment` 的 php 檔中，跑出的程式碼會變成：
```
$sql = sprintf( 'INSERT INTO comments(username, content) VALUES( "seven", ""), ("admin", (select password from users where id=54))#")',
    $username,
    $content
);
 ```
如此，留言板上會同時出現一次出現兩筆留言，一筆是 seven 這個 username 的空白留言，第二筆使用者為 admin 並印出 id=54 的 user 的密碼。
所以，這種攻擊可以慢慢撈取 DB 裡面的資料，包含帳號、密碼，或者偽造他人帳號發文等。

### 防範方法
在 PHP 中幫 SQL 指令加上 Prepared statement 來防範。

```
// 以前的 $sql
$sql = sprintf(
    "insert into comments(nickname, content) values('%s', '%s')",
    $nickname,
    $content
  );
$result = $conn->query($sql);

// 加上 Prepared statement
$sql = "insert into comments(nickname, content) values(?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $content);
$result = $stmt->execute();
// 拿 $result 要再加上
$result = $stmt->get_result();

```

##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理

在網站中的 input 輸入並執行 html 程式碼，把網站導到釣魚網站或偷走人家的 id。

### 防範方法
PHP 內建功能 `htmlspecialchars()` 可以防止這個問題。要在顯示的地方設置這個功能，而不是在進入後台資料前就設置，因為資料庫要保留使用者輸入的完整資料。


## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
跨站請求偽造，也就是雖然在不同的網域，卻能夠偷走使用者登入狀態時所帶的 cookie 或 session 相關資訊，偽造他人的身分在其他網站發出 request。因為瀏覽器只認 cookie 或 session 所帶上的資訊，就會誤以為是使用者本人所發出的 request，並執行與回覆 response。若是竊取到使用者登入銀行的資訊，就可以假裝是使用者本人，把錢轉到自己的帳戶，且使用者渾然不自知。

### 防範方法
1. 檢查 Referer
	從 request 的 header 中查看 referer，可以得知這個 request 的來源，看是否為合法的 domain。
2. 使用第三方載具的驗證碼
	如簡訊驗證碼或圖形驗證法。
3. 加上 CSRF token
	在 form 中加上一個隱藏欄位，name = csrftoken，由 server 隨機產生並存在 server 的 session 中。使用者在 submit 後會帶上這個 csrftoken，server 比對 csrftoken 跟 session 裡面的 token 是否相同來判斷是否為使用者本人發出的 request。
4. Double submit cookie
	與上述方法類似，不同點在於不把 token 存在 server，而是在 client side 存兩組 token，按下 submit 後 server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken。
5. client side 的 Double Submit Cookie
	上述是由 server 生 csrftoken，此從使用者來生 csrftoken，不管由誰生 token，都是為了確保不被攻擊者猜出。
6. browser 防禦 -> SameSite cookie( Google 的 Chrome 51 版本新功能)
	Google 在 Chrome 51 版本的新功能 `SameSite cookie`，只要在設置 cookie 的 header 裡面加上 SameSite，就可以使用這個功能，加上去之後只要不是同 site 發出的 request，就不會帶上這個 cookie。