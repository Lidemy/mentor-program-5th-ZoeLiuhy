<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$user = NULL;
if (!empty($_SESSION["username"])) {
	$username = $_SESSION["username"];
	$user = getUserFromUsername($username);
}

if (!$user || !isAdmin($user)) {
	header("Location: index.php?errorCode=5");
	die();
}

$sql = "SELECT id, role, username, nickname FROM zoeliuhy_users ORDER BY id ASC";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
if(!$result) {
	die("ERROR: " . $conn->error);
}
$result = $stmt->get_result();
?>

<!DOCTYPE html>

<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Comments Board v2</title>
		<link rel="stylesheet" href="styles.css">
	</head>
	<body>
		<div class="warning" strong>
				<strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
		</div>
		<div class="block">
			<a class="block_btn2" href="index.php">返回留言板</a>
			<a class="block_btn2" href="logout.php">登出</a>
			<h1 class="block_title">管理後台</h1>
				<section>
					<table border=1>
						<tr>
							<th>ID</th>
							<th>ROLE</th>
							<th>USERNAME</th>
							<th>NICKNAME</th>
							<th>AUTHORITY</th>
						</tr>
						<?php while ($data = $result->fetch_assoc()) { ?>
						<tr>
							<td><?php echo escape($data["id"]) ?></td>
							<td><?php echo escape($data["role"]) ?></td>
							<td><?php echo escape($data["username"]) ?></td>
							<td><?php echo escape($data["nickname"]) ?></td>
							<td>
								<a class="block_btn3" href="handle_update_authority.php?role=ADMIN&id=<?php echo escape($data["id"]); ?>">ADMIN</a>
								<a class="block_btn3" href="handle_update_authority.php?role=NORMAL&id=<?php echo escape($data["id"]); ?>">NORMAL</a>
								<a class="block_btn3" href="handle_update_authority.php?role=SUSPENDED&id=<?php echo escape($data["id"]); ?>">SUSPENDED</a>
							</td>
						</tr>
						<?php } ?>
					</table>	
				</section>
				<div class=line></div>
		</div>
	</body>
</html>