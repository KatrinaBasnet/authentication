<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

require_once "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $user_id = $user['id'];


    $_SESSION['logged_in'] = true;
    $_SESSION['user_id'] = $user_id;

    
    $logStmt = $conn->prepare("INSERT INTO login_logs (user_id, email) VALUES (?, ?)");
    $logStmt->bind_param("is", $user_id, $email);
    $logStmt->execute();

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "session_id" => session_id()
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
