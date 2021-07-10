<?php
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$user = NULL;
if (empty($_SESSION["username"])) {
  header("Location: login.php?errorCode=3");
  die();
}

$username = $_SESSION["username"];
$user = getUserFromUsername($username);


if (!isAdmin($user)) {
  header("Location: login.php?errorCode=3");
  die();
}
?>