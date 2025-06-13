<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

require_once "db.php";

$sql = "SELECT `id`, `user_id`, `email`, `login_time` FROM `login_logs`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $logins = [];
    while ($row = $result->fetch_assoc()) {
        $logins[] = $row;
    }
    echo json_encode(["success" => true, "data" => $logins]);
} else {
    echo json_encode(["success" => false, "message" => "No records found"]);
}
$conn->close();
