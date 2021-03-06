## 跟你朋友介紹 Git

嗨！菜哥，
下面跟你簡單介紹一下 Git 喔~

###Git 的基本概念

Git 是一個**版本控制**系統，但是**版本控制**是什麼呢？

若以有很多不同版本笑話的情況來舉例說明，今天寫好了笑話存檔為 `笑話v1` ，第2天突然有靈感改了一點內容存檔為 `笑話v2` ，第3天覺得第2天的修改不好，再返回 `笑話v1` 修改存檔為 `笑話v3` ，但講給朋友聽後，朋友覺得 `笑話v2` 比較好笑，並且給了建議修正為 `笑話v4` 。陸續在修了幾個版本後，會發現很難記錄好每一版本的來源，例如 `笑話v4` 來源為 `笑話v2` ， `笑話v3` 的來源是 `笑話v1` 。還有積年累月後會有一系列的版本，過了一段時間回頭看就不知道每個檔案中改了哪些部分。

Git 這個系統則可以協助作者記錄各版本的改變內容，並將新版本與選定的舊版本合併，也就是所謂達到版本控制的功能。且 Git 可提供多人同時協作，讓專案成員可以不受限僅能單人在單一時間開啟某檔作業，也可幫助專案成員及時同步所開發的系統到版本最新狀態。

###Git 的基礎使用

接下來，就稍微簡介一些 Git 的使用方法吧！

#####操作流程
- Step 1，安裝 Git ，可透過[官網](https://git-scm.com/)直接下載。
- Step 2，進到要加入版控的資料夾將資料夾初始化 `git init`
- Step 3，決定不用加入版控的檔案，放入 gitignore 編輯器中 `vim .gitignore` --> 輸入檔案名稱 <file name> --> 離開編輯器

*使用者電腦端分為**工作目錄(Working Directory)**、**暫存區(Stating Area)**、**本地端檔案庫(Local Repository)***

- Step 4，將檔案從工作目錄中加入版控暫存區 `git add .` / 只加入單一檔案 `git add <file name>`
- Step 5，將檔案從暫存區再增到檔案庫 `git commit -m '<message>'`

*** Step 4 & 5 也可合併使用 `git commit -am '<message>'` (但這對新加入的檔案無效)


#####其他常用功能

|指令碼|功能|
|:------------:|:----------:|
| `git status` | 查看目前狀態|
| `git log`    |查看 commit 歷史紀錄|
| `git checkout` <版本號>|切換到不同 commit 版本|
| `git diff`   |列出不同版本差異內容|
| `rm -r .git` |刪除 .git |


###Git 與 Github 的關聯

上述提及 Git 可以在同一時間多人協同作業，是如何進行的呢？

簡單來說，若是在自己電腦中修改的檔案，可透過將檔案 push 到 Github 這個遠端來分享你的貢獻。
若是要將他人更新的檔案與自己的檔案同步，則是要將他人放上 Github 的檔案 pull 下來到自己的電腦 local 端，這會直接自動跟 local 端的 master 合併 。





