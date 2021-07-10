<?php
session_start();
require_once("conn.php");

if (
  empty($_POST["nickname"]) 
) {
  header("Location: register.php?errorCode=2");
  die();
}

$username = $_SESSION["username"];
$nickname = $_POST["nickname"];

$sql = "UPDATE zoeliuhy_users SET nickname=? WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nickname, $username);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

echo "<script>alert('修改成功 !')</script>";
echo "<script>window.location.href='index.php'</script>";
?>