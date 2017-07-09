<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');
require_once('jwt_helper.php')

if(isset($_POST["username"], $_POST["password"])) 
    {

		$username = stripslashes($_POST["username"]); 
		$username = mysql_real_escape_string($_POST["username"]);

		$password = stripslashes$_POST["password"]); 
		$password = mysql_real_escape_string$_POST["password"]); 

		$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']) 
		    or die('{"error": "Failed to connect." ' . mysqli_error($conn) . '}');     

        $sql = "SELECT username, password FROM user WHERE username = '".$username."' AND  password = '".$password."'");
		$result = mysqli_query($conn, $sql) or die('{"error": "Failed to query." ' . mysqli_error($conn) . '}');

        if(mysql_num_rows($result) > 0 )
        { 
			$token = array();
			$token['id'] = $username;
			echo JWT::encode($token, 'secret_server_key');
        }
        else
        {
            die('{"error": "Användarnamnet eller lösenordet är inkorrekt."}');
        }
        mysqli_close($conn); 
	}
?>