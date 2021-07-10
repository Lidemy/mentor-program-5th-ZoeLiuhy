<?php
session_start();
require_once("conn.php");
require_once("utils.php");
require_once("authority_check.php");

if (
  empty($_POST["title"]) ||
  empty($_POST["content"])
) {
  header("Location: create.php?errorCode=1");
  die();
}

$title = $_POST["title"];
$content = $_POST["content"];

$sql = "INSERT INTO zoeliuhy_articles(title, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $title, $content);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

echo "<script>alert('新增成功 !')</script>";
echo "<script>window.location.href='admin.php'</script>";
?>