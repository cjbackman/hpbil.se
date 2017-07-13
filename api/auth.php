<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');
require_once('jwt_helper.php');

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

if(isset($data["username"], $data["password"])) 
    {

		$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);
		if (!$conn) {
			http_response_code(500);
			echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
		} 
		//$username = stripslashes($data["username"]); 
		$username = mysqli_real_escape_string($conn, $data["username"]);

		//$password = stripslashes($data["password"]); 
		$password = mysqli_real_escape_string($conn ,$data["password"]);

        $sql = "SELECT username, password FROM users WHERE username = '".$username."'";
        //AND  password = '".$password."'";
		$result = mysqli_query($conn, $sql);
		if (!$result) {
			http_response_code(500);
			mysqli_close($conn);
			echo '{"error": "Failed query: ' . mysqli_error($result) . '"}';
		}

        if($row = $result->fetch_assoc())
        { 
        	if(password_verify($password, $row['password'])) {
				$token = array();
				$token['id'] = $username;
				$token_string = JWT::encode($token, 'secret_server_key');
				mysqli_close($conn);
				echo '{"token": "' . $token_string . '"}';
			}
			else {
	        	mysqli_close($conn);
	        	http_response_code(401);
	            echo '{"error": "Användarnamnet eller lösenordet är inkorrekt."}';				
			}
        }
        else
        {
        	mysqli_close($conn);
        	http_response_code(401);
            echo '{"error": "Användarnamnet eller lösenordet är inkorrekt."}';
        } 
	}
else {
	http_response_code(400);
	echo '{"error": "Username and password not provided."}';
}
?>