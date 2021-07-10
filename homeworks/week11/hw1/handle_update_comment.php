<?php
session_start();
require_once("conn.php");
require_once("utils.php");

if (empty($_POST["content"])) {
  header("Location: update_comment.php?errorCode=1");
  die();
}

$username = $_SESSION["username"];
$id = $_POST["id"];
$content = $_POST["content"];
$user = getUserFromUsername($username);

if (isAdmin($user)) {
  $sql = "UPDATE zoeliuhy_comments SET content=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $content, $id);
} else if (!empty($user)) {
  $sql = "UPDATE zoeliuhy_comments SET content=? WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sis", $content, $id, $username);
} else {
  die();
}

$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

echo "<script>alert('修改成功 !')</script>";
echo "<script>window.location.href='index.php'</script>";
?>