<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('../config/config.php');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if(!isset($data['id'])) {
	http_response_code(400);
	echo '{"error": "No ID provided."}';
}

$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
if (!$conn) {
	http_response_code(500);
	echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
} 
$conn->set_charset("utf8mb4");

$remove_car_query = 'UPDATE cars SET deleted = 1 WHERE id = ' . $data['id'] . '';
$result = mysqli_query($conn, $remove_car_query);
if (!$result) {
	http_response_code(500);
	echo '{"error": "Could not delete car: ' . mysqli_error($conn) . '"}';
}

$remove_imgs_query = 'UPDATE images SET deleted = 1 WHERE car_id = ' . $data['id'] . '';
$result = mysqli_query($conn, $remove_imgs_query);
if (!$result) {
	http_response_code(500);
	echo '{"error": "Could not delete images: ' . mysqli_error($conn) . '"}';
}

http_response_code(200);
echo '{"id": ' . $data['id'] . '}';
mysqli_close($conn);
?>