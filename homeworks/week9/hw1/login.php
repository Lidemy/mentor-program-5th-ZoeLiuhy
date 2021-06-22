<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Comments Board</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
    <div>
      <a href="index.php" class="member__btn">Back to Board</a>
      <a href="register.php" class="member__btn">Register</a>
    </div>
    <h1>Login</h1>
    <?php
      if(!empty($_GET['errorCode'])) {
        $code = $_GET['errorCode'];
        $msg = 'ERROR';
        if ($code === '1') {
          $msg = 'Incompleted information.';
        } else if ($code === '2') {
          $msg = 'Used username.';
        } else if ($code === '3') {
          $msg = 'Incorrect username or password.';
        }
        echo '<h2 class="errorMsg">ERROR: ' . $msg . '</h2>';
      }
    ?>
    <form class="board__form" method="POST" action="handle_login.php">
      <div class="board__nickname">
        <span>Username : </span>
        <input type="text" name="username" />
      </div>
      <div class="board__nickname">
        <span>Password : </span>
        <input type="password" name="password" />
      </div>
      <div>
      <input type="submit" class="submit__btn" value="Submit" />
      </div>
    </form>
    <div class="board__hr"></div>
  </main>
</body>
</html>