<?php
session_start();
require_once("conn.php");
require_once("utils.php");
require_once("authority_check.php");
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
    <div class="container">
      <div class="edit-post">
        <form action="handle_create_article.php" method="POST">
          <div class="edit-post__title">
          發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" name="title" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"></textarea>
          </div>
          <?php 
            if (!empty($_GET["errorCode"])) {
              $code = $_GET["errorCode"];
              $msg = "Error";
              if ($code === "1") {
                $msg = "請輸入文章標題與內容";
              }
              echo '<h3 class="errorMsg">錯誤： ' . $msg . '</h3>';
            }
          ?>  
          <div class="edit-post__btn-wrapper">
            <input class="edit-post__btn" type="submit" value="送出" />
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>