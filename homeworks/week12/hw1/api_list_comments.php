<?php
require_once("conn.php");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: * ");

if (
  empty($_GET["site_key"])
) {
  $json = array(
    "status" => false,
    "message" => "Please add site_key in url."
  );

  $response = json_encode($json);
  echo $response;
  die();
}

$site_key = $_GET["site_key"];

if (empty($_GET["before"])) {
  $sql = "SELECT id, nickname, content, created_at 
  FROM zoeliuhy_discussions WHERE site_key = ? 
  ORDER BY id DESC LIMIT 5";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $site_key);
} else {
  $sql = "SELECT id, nickname, content, created_at 
  FROM zoeliuhy_discussions WHERE site_key = ? 
  AND id < ? 
  ORDER BY id DESC LIMIT 5";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $site_key, $_GET["before"]);
}

$result = $stmt->execute();

if (!$result) {
  $json = array(
    "status" => false,
    "message" => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$result = $stmt->get_result();
$discussions = array();

while($data = $result->fetch_assoc()) {
  array_push($discussions, array(
    "id" => $data["id"],
    "nickname" => $data["nickname"],
    "content" => $data["content"],
    "created_at" => $data["created_at"],
  ));
}

$json = array(
  "status" => true,
  "discussions" => $discussions
);

$response = json_encode($json);
echo $response;
?>