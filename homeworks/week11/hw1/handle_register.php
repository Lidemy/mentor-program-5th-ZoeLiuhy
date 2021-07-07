<?php
session_start();
require_once("conn.php");

if (
  empty($_POST["username"]) ||
  empty($_POST["password"]) ||
  empty($_POST["nickname"]) 
) {
  header("Location: register.php?errorCode=2");
  die();
}

$username = $_POST["username"];
$nickname = $_POST["nickname"];

$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$sql = "INSERT INTO zoeliuhy_users(username, password, nickname) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $password, $nickname);
$result = $stmt->execute();
if(!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header("Location: register.php?errorCode=3");
  }
  die("ERROR: ". $conn->error);
}

echo "<script>alert('註冊成功 !')</script>";
$_SESSION["username"] = $username;
echo "<script>window.location.href='index.php'</script>";
?>