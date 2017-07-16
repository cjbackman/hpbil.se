<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);


$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
if (!$conn) {
	http_response_code(500);
	echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
} 

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
}

else { # insert new car
	$sql_insert = 'INSERT INTO cars (brand, model, year, milage, price, color, misc) 
		VALUES(
			"'. $data['brand'] .'",
			"' . $data['model'] . '",
			' . $data['year'] . ',
			' . $data['milage'] . ',
			' . $data['price'] . ',
			"' . $data['color'] . '",
			"' . $data['misc'] . '"
		);';

	$result = mysqli_query($conn, $sql_insert);
	if (!$result) {
		http_response_code(500);
		echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
	}	
}

mysqli_close($conn);
?>