<?php
  session_start();
  require_once('conn.php');

  function gernerateToken() {
    $s = '';
    for($i=1; $i<=16; $i++) {
      $s .= chr(rand(65,90));
    }
    return $s;
  }

  function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf (
      'SELECT * FROM zoeliuhy_users WHERE username= "%s"',
    $username
    );
    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }
    $data = $result->fetch_assoc();
    return $data;
  }
?>