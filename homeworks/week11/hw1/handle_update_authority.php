<?php
session_start();
require_once("conn.php");
require_once("utils.php");

if (empty($_GET["id"]) || empty($_GET["role"])) {
  die("資料不齊全");
}

$username = $_SESSION["username"];
$id = $_GET["id"];
$role = $_GET["role"];
$user = getUserFromUsername($username);

if (!$user || !isAdmin($user)) {
  header("Location: index.php?errorCode=5");
  die();
}

$sql = "UPDATE zoeliuhy_users SET role=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $role, $id);

$result = $stmt->execute();
if(!$result) {
  die("ERROR: ". $conn->error);
}

header("Location: admin.php");
exit;
?>