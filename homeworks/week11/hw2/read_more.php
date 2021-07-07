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

if (!empty($_GET["id"])) {
  $id = $_GET["id"];
} else {
  header("Location: index.php?errorCode=1");
}

$sql = "SELECT * FROM zoeliuhy_articles WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}
$result = $stmt->get_result();
$data = $result->fetch_assoc();
?>

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
  <div class="container-wrapper">
    <div class="posts">
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
        <div class="post__content"><?php echo escape($data["content"]) ?></div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>