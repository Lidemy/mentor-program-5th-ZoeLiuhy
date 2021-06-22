<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(
    empty($_POST['content'])
  ) {
    header('Location: index.php?errorCode=1');
    die();
  }

  $user = getUserFromUsername($_SESSION['username']);
  $nickname = $user['nickname'];
  $content = $_POST['content'];
  $sql = sprintf(
    'INSERT INTO zoeliuhy_comments(nickname, content) VALUES( "%s", "%s")',
    $nickname,
    $content
  );

  $result = $conn->query($sql);

  if(!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>