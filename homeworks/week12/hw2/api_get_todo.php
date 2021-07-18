<?php
require_once("conn.php");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: * ");

if (
  empty($_GET["id"])
) {
  $json = array(
    "status" => false,
    "message" => "Please add id in url."
  );

  $response = json_encode($json);
  echo $response;
  die();
}

$id = intval($_GET["id"]);
$sql = "SELECT id, todo FROM zoeliuhy_todos WHERE id = ? ORDER BY id DESC LIMIT 5";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
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
$data = $result->fetch_assoc();
$json = array(
  "status" => true,
  "todo" => array(
    "id" => $data["id"],
    "todo" => $data["todo"]
  )
);

$response = json_encode($json);
echo $response;
?>