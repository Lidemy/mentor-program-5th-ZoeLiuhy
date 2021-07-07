<?php 
  $uri = $_SERVER['REQUEST_URI'];
  $isAdminPage = (strpos($uri, 'admin.php') !== false);
?>

<nav class="navbar">
  <div class="wrapper navbar__wrapper">
    <div class="navbar__site-name">
      <a href='index.php'>Who's Blog</a>
    </div>
    <ul class="navbar__list">
      <div>
        <li><a href="list_of_articles.php">文章列表</a></li>
        <li><a href="#">分類專區</a></li>
        <li><a href="#">關於我</a></li>
      </div>
      <div>
      <?php if (empty($user)) { ?>
        <li><a href="index.php">首頁</a></li>
        <li><a href="login.php">登入</a></li>
      <?php } else if (isAdmin($user)) { ?>
          <?php if ($isAdminPage) { ?>
            <li><a href="create_article.php">新增文章</a></li>
          <?php } else { ?>
            <li><a href="admin.php">管理後台</a></li>
          <?php } ?>
        <li><a href="index.php">首頁</a></li>
        <li><a href="logout.php">登出</a></li>
      <?php } ?>
      </div>
    </ul>
  </div>
</nav>