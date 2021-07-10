<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <?php include_once("navbar.php"); ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="login-wrapper">
    <h2>Login</h2>
    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <?php
        if (!empty($_GET["errorCode"])) {
          $code = $_GET["errorCode"];
          $msg = "ERROR";
          if ($code === "1") {
            $msg = "請輸入完整資料 !";
          } else if ($code === "2") {
            $msg = "使用者名稱或密碼有誤 !";
          } else if ($code === "3") {
            $msg = "無權有此操作 !";
          }
          echo '<h3 class="errorMsg">錯誤：' . $msg . '</h3>';
        }
      ?>
      <input type='submit' value="登入" />
    </form>
  </div>
</body>
</html>