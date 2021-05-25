## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

###1. 選單 `<select></select>` & 清單值 `<option></option>` 
使用範例：
	<select name="country" size="5" mutiple>
      <option value="taiwan">台灣</option>
      <option value="japan">日本</option>
      <option value="korea">韓國</option>
      <option value="usa">美國</option>
      <option value="uk">英國</option>
      <option value="china">中國</option>
      <option value="netherland">荷蘭</option>
      <option value="france">法國</option>
    </select>

###2. 文字區域 `<textarea></textarea>`
使用範例：
	<textarea name="text" cols="30" rows="5"></textarea>

###3. 表單中上傳檔案的 `input type="file"`
使用範例：
	<input name="document" type="file" />


## 請問什麼是盒模型（box model）

盒模型的示意圖可以在使用瀏覽器的開發人員工具中具體看見，由內容 + 內邊距 padding + 邊框 border + 外邊距 margin 所組成。另外要注意的是， box-sizing 這個屬性，使用預設的 content-box 時，內邊距與外邊距的寬高會往外增加，若要固定版面的寬高，要改為 border-box。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

- block: 可以指定寬、高、margin、padding，會自動換行，預設是撐滿整列
		
	⇒ 預設為此屬性的元素：div, h1, p... 

- inline: 無法指定寬、高、margin-top & margin-bottom、不會自動換行( 除非用<br> )；可以設定padding、margin-left & margin-right

	⇒ 預設為此屬性的元素：span, a

- inline-block: 可以指定寬、高、margin、padding、vertical-align，與 inline 一樣不會自動換行，但卻是以 block 元素盒子的方式顯示，可以併排

	⇒ 預設為此屬性的元素：button, input, select, img


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- static: 預設的排版方式，按照順序，上至下，左至右，**" 不跳脫排版流、不以特殊位置定位 "**

- relative: 相對位置，針對原排版的地方做相對位置定位，不會影響其他元素的位置，只會改變自己位置，**" 不跳脫排版流，以原本的位置為原點移動 "**

- absolute: 絕對位置，針對某個參考點做定位，往上找第一個 position 不是 static 的元素， **" 跳脫排版流，以特定元素來移動 "**

- fixed: 固定在 viewport ( 類似於瀏覽器 ) 的某個位置，**" 跳脫排版流，以視窗為原點來移動 "**
