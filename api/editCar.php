<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");

$config = include('../config/config.php');

$request_body = file_get_contents('php://input');

$data = json_decode($request_body, true);

$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
if (!$conn) {
	http_response_code(500);
	echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
}
$conn->set_charset("utf8mb4");

if (isset($data['id'])) { #update car
	$sql_update = 'UPDATE cars SET
		brand = "'. $data['brand'] .'",
		model = "' . $data['model'] . '",
		year = ' . $data['year'] . ',
		milage = ' . $data['milage'] . ',
		price = ' . $data['price'] . ',
		color = "' . $data['color'] . '",
		misc = "' . $data['misc'] . '"
	WHERE id = '. $data['id'] . '';

	$result = mysqli_query($conn, $sql_update);
	if (!$result) {
		http_response_code(500);
		echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
	}
	else {
		if (isset($data['images'])) {
			$id = $data['id'];
			foreach ($data['images'] as $img) {
				$sql_insert_images = 'INSERT INTO images (car_id,filename) VALUES ('.$id.',"'.$img.'")';
				$result = mysqli_query($conn, $sql_insert_images);
				if (!$result) {
					http_response_code(500);
					echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
				}
			}
		}
	}
}

else { # insert new car
	$sql_insert = 'INSERT INTO cars (brand, model, year, milage, price, color, misc)
		VALUES(
			"'. $data['brand'] .'",
			"' . $data['model'] .'",
			' . $data['year'] . ',
			' . $data['milage'] . ',
			' . $data['price'] . ',
			"' . $data['color'] . '",
			"' . $data['misc'] . '"
		);';

	$result = mysqli_query($conn, $sql_insert);
	$id = mysqli_insert_id($conn);
	if (!$result) {
		http_response_code(500);
		echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
	}
	else {
		if (isset($data['images'])) {
			foreach ($data['images'] as $img) {
				$sql_insert_images = 'INSERT INTO images (car_id,filename) VALUES ('.$id.',"'.$img.'")';
				$result = mysqli_query($conn, $sql_insert_images);
				if (!$result) {
					http_response_code(500);
					echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
				}
			}
		}
	}
}

mysqli_close($conn);
?>