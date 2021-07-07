<?php
session_start();
require_once("conn.php");
require_once("utils.php");

if (
  empty($_POST["username"]) ||
  empty($_POST["password"])
) {
  header("Location: login.php?errorCode=2");
  die();
}

$username = $_POST["username"];
$password = $_POST["password"];
$sql = "SELECT * FROM zoeliuhy_users WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

$result = $stmt->get_result();
if ($result->num_rows === 0) {
  header("Location: login.php?errorCode=4");
  exit();
}
$data = $result->fetch_assoc();
if (password_verify($password, $data["password"])) {
  $_SESSION["username"] = $username;
  echo "<script>alert('登入成功 !')</script>";
  echo "<script>window.location.href='index.php'</script>";
} else {
  header("Location: login.php?errorCode=4");
}
?>