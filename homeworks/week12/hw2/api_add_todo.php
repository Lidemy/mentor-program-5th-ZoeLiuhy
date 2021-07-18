<?php
require_once("conn.php");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: * ");

if (
  empty($_POST["todo"])
) {
  $json = array(
    "status" => false,
    "message" => "Please fill in the blank."
  );

  $response = json_encode($json);
  echo $response;
  die();
}

$todo = $_POST["todo"];

$sql = "INSERT INTO zoeliuhy_todos(todo) VALUES(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $todo);
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
  "id" => $last_id
);

$response = json_encode($json);
echo $response;
?>