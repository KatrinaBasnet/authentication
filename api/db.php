<?php
$host = "localhost";
$username = "root";     
$password = "";          
$dbname = "auth_system";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}
?>
