<?php
session_start();
require_once("conn.php");
require_once("utils.php");
require_once("authority_check.php");

if (
  empty($_GET["id"])
) {
  header("Location: " . $_SERVER["HTTP_REFERER"]);
  die();
}

$id = intval($_GET["id"]);

$sql = "UPDATE zoeliuhy_articles SET is_deleted = 1 WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

echo "<script>alert('刪除成功 !')</script>";
echo "<script>window.location.href='admin.php'</script>";
?>