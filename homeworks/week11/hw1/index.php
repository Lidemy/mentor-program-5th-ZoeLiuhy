<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$user = NULL;
if (!empty($_SESSION["username"])) {
  $user = getUserFromUsername($_SESSION["username"]);
  $username = $user["username"];
  $nickname = $user["nickname"];
}

$page = 1;
if (!empty($_GET["page"])) {
  $page = intval($_GET["page"]);
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;

$sql = 
"SELECT 
C.id AS id, C.content AS content, C.created_at AS created_at, 
U.nickname AS nickname, U.username AS username 
FROM zoeliuhy_comments AS C 
LEFT JOIN zoeliuhy_users AS U ON C.username = U.username
WHERE C.is_deleted IS NULL
ORDER BY id DESC
LIMIT ?, ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $items_per_page);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: " . $conn->error);
}
$result = $stmt->get_result();
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
    <?php if (!$username) { ?>
      <a class="block_btn2" href="register.php">註冊</a>
      <a class="block_btn2" href="login.php">登入</a>
    <?php } else { ?>
      <a class="block_btn2" href="logout.php">登出</a>
      <span class="block_btn2 update_nickname">編輯暱稱</span>
        <form class="updateNickname_form hide" method="POST" action="handle_update_nickname.php">
          <div class="block_name_content2">
            <span>新的暱稱：</span>
            <input type="text" class="block_name" name="nickname" />
          </div>
          <input type="submit" class="block_btn" value="更新" />
        </form>
        <?php if ($user && isAdmin($user)) { ?>
          <a class="block_btn2" href="admin.php">管理後台</a>
        <?php } ?>
        <?php } ?>
          <h1 class="block_title">留言板</h1>
        <?php if (!$username) { ?>
          <h2 class="block_greeting">哈囉，歡迎來到我的留言板 !</h2>
        <?php } else { ?>
          <h2 class="block_greeting">哈囉，<?php echo escape($nickname) ?>，歡迎來到我的留言板 !</h2>
        <?php } ?>
        <?php
          if (!empty($_GET["errorCode"])) {
            $code = $_GET["errorCode"];
            $msg = "Error";
            if ($code === "1") {
              $msg = "請輸入留言 !";
            } else if ($code === "2") {
              $msg = "請輸入完整資料 !";
            } else if ($code === "5") {
              $msg = "無管理權限 !";
            }
            echo '<h2 class="errorCode">錯誤： ' . $msg . '</h2>';
          }
        ?>
      <form method="POST" action="handle_add_comment.php">
        <div class="block_name_content">
          <textarea class="block_content" placeholder="請在這留下想對我說的話..." rows="5" name="content"></textarea>
        </div>
        <?php if($username && !hasPermission($user, "CREATE", NULL)) { ?>
          <h3 class="errorCode">無權發布留言。</h3>
        <?php } else if($username) { ?>
          <input type="submit" class="block_btn" value="發送" />
        <?php } else { ?>
          <h3 class="errorCode">註冊且登入後才能發布留言。</h3>
        <?php } ?>
      </form>
      <div class=line></div>
      <section class="recordlist">
        <?php while ($data = $result->fetch_assoc()) { ?>
          <div class="record">
            <div class="record_leftside_picture"></div>
            <div class="record_rightside_body">
              <div class="record_info">
                <div class="record_info_name">
                  <?php echo escape($data["nickname"]); ?>
                  (@
                  <?php echo escape($data["username"]); ?>
                  )
                </div>
                <div class="record_info_time">
                  <?php echo escape($data["created_at"]); ?>
                </div>
                <?php if (hasPermission($user, "EDIT&DELETE", $data)) { ?>
                  <a class="block_btn3" href="update_comment.php?id=<?php echo $data["id"] ?>">編輯</a>
                  <a class="block_btn3" href="handle_delete_comment.php?id=<?php echo $data["id"] ?>">刪除</a>
                <?php } ?>
              </div>
            <p class="record_content"><?php echo escape($data["content"]); ?></p>
            </div>
          </div>
        <?php } ?>
      </section>
      <div class=line></div>
      <?php
        $sql = "SELECT count(id) AS count FROM zoeliuhy_comments WHERE is_deleted IS NULL";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        $count = $data["count"];
        $total_page = intval(ceil($count / $items_per_page));
      ?>
      <div class="page_info">
        <span>共有 <?php echo escape($count) ?> 筆留言</span><br>
        <span><?php echo escape($page) ?> / <?php echo escape($total_page) ?>頁</span>
      </div>
      <div class="paginator">
      <?php if ($page !== 1) { ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo escape($page - 1) ?>">上一頁</a>
      <?php } ?>
      <?php if ($page !== $total_page) { ?>
        <a href="index.php?page=<?php echo escape($page + 1) ?>">下一頁</a>
        <a href="index.php?page=<?php echo escape($total_page) ?>">末頁</a>
      <?php } ?>
      </div>
    </div>
  </body>
  <script>
    var updateNicknameBtn = document.querySelector('.update_nickname')
    updateNicknameBtn.addEventListener('click', function() {
      var updateNicknameForm = document.querySelector('.updateNickname_form')
      updateNicknameForm.classList.toggle('hide')
    })
  </script>
</html>