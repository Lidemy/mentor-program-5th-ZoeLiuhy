## 教你朋友 CLI

嗨！h0w 哥，
下面跟你簡單介紹一下command line喔！

### 1. 什麼是 command line？

**Ans**

一種用純文字的指令操作電腦的方式。就如平常我們操作電腦會有圖示化的視窗，這是圖形化的介面叫做 GUI 。command line 則是純文字的介面，同樣可以用來操作電腦，只是是以下文字指令非圖示化的方式來進行。


### 2. 如何使用？

**Ans**

首先，需下載可編輯 command line 的編輯器

	- Windows電腦 
	1. 下載 Git，會附加 git-bash
	2. Cmder

	- Mac 電腦
	1. 直接搜尋 terminal 
	2. Item2

接下來，只要打開編輯器，輸入指令碼即可。
常見的指令如下：

- 列出目前所在位置 `pwd` 
- 列出目前所在位置的所有檔案 `ls`
- 切換到不同的資料夾 `cd`
- 返回上一層 `..`
- 建立新檔案 `touch <name>`
- 刪除檔案 `rm <file name>`
- 複製檔案 `cp <file name> <new file name>`
- 建立新資料夾 `mkdir <dir name>`
- 刪除資料夾 `rm -r <dir name>`
- 複製資料夾 `cp -r <dir name> <new dir name>`
- 移動檔案 `mv <file name> <dir name>`
- 更改檔名 `mv <old file name> <new file name>`
- 進到某檔案的文字編輯器 `vim <name>`
- 在文字編輯器中編輯 `按鍵I`
- 在文字編輯器中停止編輯 `按鍵Esc`
- 離開文字編輯器 `:q`
- 存檔編輯並離開文字編輯器 `:wq`

### 3. 如何用command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案？

**Ans**

|序號|步驟        |指令碼          |
|:---:|:--------:|:--------------:|
|1.|建立wifi資料夾| `mkdir wifi`   |
|2.|進到資料夾中  | `cd wifi`      |
|3.|建立afu.js檔案| `touch afu.js` |

