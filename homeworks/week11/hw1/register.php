<!DOCTYPE html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Comments Board v2</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="warning" strong>
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </div>
  <div class="block">
    <a class="block_btn2" href="index.php">返回留言板</a>
    <a class="block_btn2" href="login.php">登入</a>
    <h1 class="block_title">註冊</h1>
    <h2 class="block_greeting">哈囉，歡迎來到我的留言板，先來註冊帳號吧。</h2>
    <?php
      if (!empty($_GET["errorCode"])) {
        $code = $_GET["errorCode"];
        $msg = "Error";
        if ($code === "2") {
        $msg = "請輸入完整資料 !";
        } else if ($code === "3") {
        $msg = "使用者名稱已有人使用，請重新輸入。";
        }
        echo '<h2 class="errorCode">錯誤： ' . $msg . '</h2>';
      }
    ?>
    <form method="POST" action="handle_register.php">
      <div class="block_name_content">
        <span>使用者名稱：</span>
        <input type="text" class="block_name" name="username" />
      </div>
      <div class="block_name_content">
        <span>密碼：</span>
        <input type="password" class="block_name" name="password" />
      </div>
      <div class="block_name_content">
        <span>暱稱：</span>
        <input type="text" class="block_name" name="nickname" />
      </div>
      <input type="submit" class="block_btn" value="註冊" />
    </form>
    <div class=line></div>
  </div>
</body>
</html>