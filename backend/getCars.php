<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');

$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']) 
    or die('{"error": "Failed to connect." ' . mysqli_error($conn) . '}');

$sql = "SELECT * FROM cars";

$result = mysqli_query($conn, $sql) or die('{"error": "Failed to query." ' . mysqli_error($conn) . '}');

$rows = array();
while($row = mysqli_fetch_assoc($result))
{
    $rows[] = array_map('utf8_encode', $row);
}

echo json_encode($rows);
mysqli_close($conn);
?>