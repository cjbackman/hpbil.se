<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('jwt_helper.php');

$headers = getallheaders();
try {
	$token = JWT::decode($headers['Authorization'], 'secret_server_key');
	if (property_exists($token, 'id')) {
		echo '{}';
	}
	else {
		http_response_code(403);
		echo '{"error": "Invalid token."}';	
	}
}
catch (Exception $e) {
	http_response_code(403);
	echo '{"error": "Invalid token."}';	
}
?>