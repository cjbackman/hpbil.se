<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');
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

$sql = 'UPDATE cars SET deleted = 1 WHERE id = ' . $data['id'] . '';
$result = mysqli_query($conn, $sql);
if (!$result) {
	http_response_code(500);
	echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
}

http_response_code(200);
echo '{"id": ' . $data['id'] . '}';
mysqli_close($conn);
?>