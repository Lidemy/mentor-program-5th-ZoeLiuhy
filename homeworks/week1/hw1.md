## 交作業流程1. 建立新的 branch --> **`git branch week1`**2. 切換到新的 branch 中寫作業 --> **`git checkout week1`**3. 作業寫好後 add 到版本控制並 commit 建立新版本 --> **`git commit -am "week1 finished"`**待作業寫好...4. 將 branch push 到 Github --> **`git push origin week1`**5. 到 Github 查看是否已經成功推上 week1 的 branch 6. 到學習系統看作業的自我檢討把常見錯誤修改7. 更新後的檔案再次 add 到版本控制、commit 建立新版本、push 到 Github 8. **`Open pull request`** 9. 將 Github 上 PR 的網址貼到學習系統中的繳交作業
待助教改完作業，會把 branch (week1) merge 進去 master (看到狀態為 merged)，就可以將 Github 上助教改好的東西同步到自己 local 電腦

11. 先到自己的master branch --> **`git checkout master`**12. 拉下助教改好的檔案 --> **`git pull origin master`**

13. 刪除week1 branch --> **`git branch -d week1`**
## Done!