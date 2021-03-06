## hw1：好多星星
看到星星題目真的是既開心又害怕，因為之前已經碰過幾次星星題，可是每次要印出星星的方式都不太一樣，所以讓我卡有點久，可能也是初學時對於基本語法還不熟悉。從練習這些不同種的星星題目，我開始深刻體會出 `console.log` 還有 `return` 所放的位置，會如何影響結果的呈現。當時這題的另一個困難是要學會怎麼在 LIOJ 上取出資料，多虧有老師在 [MTR05] 的補充課程，我在這邊才沒有卡關太久。

## hw2：水仙花數
這題是從 [ALG101] 課程影片中學習解法，按照老師的說法，有先自己稍微想過，再聽老師解題，但因為這題關於怎麼取得數字的尾數或者算出數字有幾位數的概念對我來說比較陌生(數學不好?)，雖然聽了一遍後還是不太懂，所以我是憑印象把老師的解法自己默寫出來，默寫時可以發現自己哪部分還有不懂，就再重新邊聽邊研究一番，然後隔天再練習默寫，再放上 LIOJ AC。

## hw3：判斷質數
這題是在 [ALG101] 的 Unit 4.2 影片中，老師在講解函式填空法時，就有看到老師的解法，主要問題在於放上 LIOJ 時要怎麼寫才能拿到 LIOJ 上資料。一開始不熟時，我是嘗試加`console.log`，把結果印出就知道獲取的資料長的樣子，以此去修改到成功獲取資料。

## hw4：判斷迴文
這題讓我感覺就是字串反轉的延伸，所以重新複習了字串反轉的寫法，再加上判斷是否與原本的 `str` 相等，就得出了結果。

## hw5：聯誼順序比大小
這題跟大家一樣都卡在沒注意到題目數字的範圍是 512 位數以內，雖然在本地端一步一步慢慢解出來，且測試成功，但是在 LIOJ 上卻 AC 不成功。後來有印象在 Mattermost 上有人發問，所以跑去看歷史訊息，再看到有人說討論區有人有同樣問題，結果看了大家的提問跟老師的解惑還是只知道問題原因但不知道如何解決，以為是 A, B, K 都要加上 `Number()` 與 `BigInt()` ，測試後錯誤訊息說 A 這個 number 是一個 Infinity 不是 Integer ，所以不能用 `BigInt()` 轉換成 Big Integer 。在很氣餒的時候先去洗了個澡，再回來看老師的作業檢討，才想到 K 只有 1 或 -1 兩種選擇，不應該是一種 Big Integer ，所以把 K 改成Number(K)，然後 MDN 上的功能介紹上有說 Number 跟 BigInt 不能混合使用，所以把 A 跟 B 改成 BigInt(A) 與 BigInt(B) ，然後就成功的 AC 了。之後要再慢慢研究老師用字串的解法，還有就算是用 `BigInt()` 來解，我寫的方法還是很冗長，所以要再練習用比較簡單的方式來完成。