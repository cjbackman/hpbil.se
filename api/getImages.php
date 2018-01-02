<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('../config/config.php');

if (!isset($_GET['car_id'])) {
	http_response_code(500);
	echo '{"error": "Car id is not set."}';	
}

$id = $_GET['car_id'];

$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
if (!$conn) {
	http_response_code(500);
	echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
}
$conn->set_charset("utf8mb4"); 

$sql = "SELECT id,car_id,filename FROM images WHERE car_id = ". $id ." AND deleted <> 1";
$result = mysqli_query($conn, $sql);
if (!$result) {
	http_response_code(500);
	echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
}

$rows = array();
while($row = mysqli_fetch_assoc($result))
{
    $rows[] = array_map(null, $row);
}

echo json_encode($rows);
mysqli_close($conn);
?>