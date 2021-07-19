<?php
require_once("conn.php");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: * ");

if (
  empty($_POST["content"]) ||
  empty($_POST["site_key"]) ||
  empty($_POST["nickname"])
) {
  $json = array(
    "status" => false,
    "message" => "Please fill in the blank."
  );

  $response = json_encode($json);
  echo $response;
  die();
}

$nickname = $_POST["nickname"];
$site_key = $_POST["site_key"];
$content = $_POST["content"];

$sql = "INSERT INTO zoeliuhy_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $site_key, $nickname, $content);
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

$last_id = mysqli_insert_id($conn);
if (!$last_id) {
  $json = array(
    "status" => false,
    "message" => mysqli_error($conn)
  );
}

$json = array(
  "status" => true,
  "message" => "Success!",
  "new_comment_id" => $last_id
);

$response = json_encode($json);
echo $response;
?>