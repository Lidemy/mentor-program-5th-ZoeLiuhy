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

function hasPermission($user, $action, $data) {
  if (!empty($user)) {
    if ($user["role"] === "ADMIN") {
    return true;
    }

    if ($user["role"] === "NORMAL") {
      if ($action === "CREATE") return true;
      return $data["username"] === $user["username"];
    }

    if ($user["role"] === "SUSPENDED") {
      if(!empty($data)) {
        return $data["username"] === $user["username"] && $action !== "CREATE";
      }
    }
  }
}

function isAdmin($user) {
  return $user["role"] === "ADMIN";
}
?>