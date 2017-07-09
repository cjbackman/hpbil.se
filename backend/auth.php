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
			header("500 Internal Server Error");
			echo '{"error": "Connection failure: ' . mysqli_error($conn) . '"}';
		} 
		//$username = stripslashes($data["username"]); 
		$username = mysqli_real_escape_string($conn, $data["username"]);

		//$password = stripslashes($data["password"]); 
		$password = mysqli_real_escape_string($conn ,$data["password"]);      

        $sql = "SELECT username, password FROM users WHERE username = '".$username."' AND  password = '".$password."'";
		$result = mysqli_query($conn, $sql);
		if (!$result) {
			header("500 Internal Server Error");
			echo '{"error": "Failed query: ' . mysqli_error($conn) . '"}';
		}

        if(mysqli_num_rows($result) > 0 )
        { 
			$token = array();
			$token['id'] = $username;
			$token_string = JWT::encode($token, 'secret_server_key');
			mysqli_close($conn);
			echo '{"token": "' . $token_string . '"}';
        }
        else
        {
        	mysqli_close($conn);
        	header("400 Bad Request");
            echo '{"error": "Användarnamnet eller lösenordet är inkorrekt."}';
        } 
	}
else {
	header("400 Bad Request");
	echo '{"error": "Username and password not provided."}';
}
?>