<?php
session_start();
require_once("conn.php");
require_once("utils.php");

if (
  empty($_POST["content"]) 
) {
  header("Location: index.php?errorCode=1");
  die();
}

$username = $_SESSION["username"];
$user = getUserFromUsername($username);

if (!hasPermission($user, "CREATE", NULL)) {
  header("Location: index.php");
  exit;
}

$content = $_POST["content"];
$sql = "INSERT INTO zoeliuhy_comments(username, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $content);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

header("Location: index.php"); 
exit;
?>