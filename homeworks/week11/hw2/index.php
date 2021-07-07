<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$user = NULL;
if (!empty($_SESSION["username"])) {
	$username = $_SESSION["username"];
	$user = getUserFromUsername($username);
} else {
  $user = NULL;
}

$page = 1;
if (!empty($_GET["page"])) {
	$page = intval($_GET["page"]);
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;

$sql = "SELECT * FROM zoeliuhy_articles WHERE is_deleted = 0 ORDER BY id DESC LIMIT ?, ?";
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
  <div class="container-wrapper">
    <div class="posts">
    <?php while ($data = $result->fetch_assoc()) { ?>
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($data["title"]) ?></div>
          <?php if (empty($user)) { ?>
          <?php } else if (isAdmin($user)) { ?>
          <div class="post__actions">
            <a class="post__action" href="update_article.php?id=<?php echo escape($data["id"])?>">編輯</a>
          </div>
          <?php } ?>
        </div>
        <div class="post__info">
          <?php echo escape($data["created_at"]) ?>
        </div>
        <div class="post__content"><?php echo escape(mb_strimwidth($data["content"], 0, 348, "...", "UTF-8")) ?></div>
        <a class="btn-read-more" href="read_more.php?id=<?php echo escape($data["id"])?>">READ MORE</a>
      </article>
    <?php } ?>
    </div>
    <?php 
            if (!empty($_GET["errorCode"])) {
              $code = $_GET["errorCode"];
              $msg = "Error";
              if ($code === "1") {
                $msg = "資料有誤";
              }
              echo '<h3 class="errorMsg">錯誤： ' . $msg . '</h3>';
            }
          ?>
  </div>
  <?php
    $sql = "SELECT count(id) AS count FROM zoeliuhy_articles WHERE is_deleted = 0";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    $count = $data["count"];
    $total_page = intval(ceil($count / $items_per_page));
	?>
  <div class="page_info">
    <span>共有 <?php echo escape($count) ?> 篇文章</span><br>
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
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>