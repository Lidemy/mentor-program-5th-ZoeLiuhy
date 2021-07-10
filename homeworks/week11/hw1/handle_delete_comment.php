<?php
session_start();
require_once("conn.php");
require_once("utils.php");

if (
  empty($_GET["id"]) 
) {
  header("Location: index.php?errorCode=2");
  die();
}

$id = $_GET["id"];
$username = $_SESSION["username"];
$user = getUserFromUsername($username);

if (isAdmin($user)) {
  $sql = "UPDATE zoeliuhy_comments SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
} else {
  $sql = "UPDATE zoeliuhy_comments SET is_deleted=1 WHERE id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $username);
}

$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

echo "<script>alert('刪除成功 !')</script>";
echo "<script>window.location.href='index.php'</script>";
?>