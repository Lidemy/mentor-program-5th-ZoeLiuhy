<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$user = NULL;
$id = NULL;

if (!empty($_GET["id"])) {
  $id = $_GET["id"];
} else {
  header("Location: update_comment.php?errorCode=2");
}

if (!empty($_SESSION["username"])) {
  $user = getUserFromUsername($_SESSION["username"]);
  $username = $user["username"];
  $nickname = $user["nickname"];
}

if (isAdmin($user)) {
  $sql = "SELECT * FROM zoeliuhy_comments WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
} else if (!empty($user)) {
  $sql = "SELECT * FROM zoeliuhy_comments WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $username);
} else {
  die();
}

$result = $stmt->execute();
if(!$result) {
  die("ERROR: " . $conn->error);
}
$result = $stmt->get_result();
$data = $result->fetch_assoc();
?>

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
    <a class="block_btn2" href="logout.php">登出</a>
    <a class="block_btn2" href="index.php">返回留言板</a>
    <h1 class="block_title">編輯留言</h1>
      <h2 class="block_greeting">哈囉，<?php echo escape($nickname) ?>，下面開放修改留言內容。</h2>
    <?php
      if (!empty($_GET["errorCode"])) {
        $code = $_GET["errorCode"];
        $msg = "Error";
        if ($code === "1") {
        $msg = "請輸入留言 !";
        } else if ($code === "2") {
        $msg = "請輸入完整資料 !";
        }
        echo '<h2 class="errorCode">錯誤： ' . $msg . '</h2>';
      }
    ?>
    <form method="POST" action="handle_update_comment.php">
      <div class="block_name_content">
        <textarea class="block_content" rows="5" name="content"><?php 
        if (!empty($data)) { 
          echo escape($data["content"]);
        } else {
          exit;
        }
        ?></textarea>
        <input type="hidden" name="id" value="<?php echo escape($data["id"]) ?>" />
      </div>
      <input type="submit" class="block_btn" value="更新" />
    </form>
    <div class=line></div>
  </div>
</body>
</html>