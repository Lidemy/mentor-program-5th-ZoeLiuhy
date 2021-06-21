<?php
  require_once('conn.php');
  require_once('utils.php');

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $result = $conn->query('SELECT * FROM zoeliuhy_comments ORDER BY id DESC');
  if (!$result) {
    die('Error: ') . $conn->error;
  }
?>

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
      <?php
        if (!$username) { ?>
        <a href="register.php" class="member__btn">Register</a>
        <a href="login.php" class="member__btn">Login</a>
      <?php
        } else { ?>
        <a href="logout.php" class="member__btn">Logout</a>
        <h3>Hello, <?php echo $username; ?> !</h3>
      <?php }  ?>
    </div>
    <h1>Comments</h1>
    <?php
      if(!empty($_GET['errorCode'])) {
        $code = $_GET['errorCode'];
        $msg = 'ERROR';
        if ($code === '1') {
          $msg = 'Incompleted information.';
        }
        echo '<h2 class="errorMsg">ERROR: ' . $msg . '</h2>';
      }
    ?>
    <form class="board__form" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5" placeholder="Describe yourself here..."></textarea>
      <div>
      <?php
      if ($username) { ?>
        <input type="submit" class="submit__btn" value="Submit" />
      <?php
      } else { ?>
        <h3>Please login.</h3>
      <?php } ?>
      </div>
    </form>
    <div class="board__hr"></div>
    <section>
      <?php
        while ($data = $result->fetch_assoc()) {
      ?>
      <div class="item">
        <div class="item__pic"></div>
        <div class="item__body">
          <div class="item__info">
            <span class="item__info__name"><?php echo $data['nickname'];?></span>
            <span class="item__info__time"><?php echo $data['created_at'];?></span>
          </div>
          <p class="item__content"><?php echo $data['content'];?></p>
        </div>
      </div>
      <?php
      }
      ?>
    </section>
  </main>
</body>
</html>