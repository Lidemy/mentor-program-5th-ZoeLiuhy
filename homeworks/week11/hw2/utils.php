<?php
require_once("conn.php");

function getUserFromUsername($username) {
  global $conn;
  $sql = "SELECT * FROM zoeliuhy_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  if(!$result) {
    die("Error: " . $conn->error);
  } 
  $result = $stmt->get_result();
  $data = $result->fetch_assoc();
  return $data;
}

function escape($str) {
  return htmlspecialchars($str, ENT_QUOTES);
}

function isAdmin($user) {
  return $user["role"] === "ADMIN";
}
?>