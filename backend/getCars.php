<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = include('config.php');

$conn = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);

$result = $conn->query("SELECT id, brand, model, year, milage, color, price, misc, created_on FROM cars");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"] . '",';
    $outp .= '"brand":"'   . $rs["brand"]        . '",';
    $outp .= '"model":"'   . $rs["model"]        . '",';
    $outp .= '"year":"'   . $rs["year"]        . '",';
    $outp .= '"milage":"'   . $rs["milage"]        . '",';
    $outp .= '"color":"'   . $rs["color"]        . '",';
    $outp .= '"price":"'   . $rs["price"]        . '",';
    $outp .= '"misc":"'   . $rs["misc"]        . '",';
    $outp .= '"created_on":"'   . $rs["created_on"]        . '"}';
}
$outp ='{"data":['.$outp.']}';
$conn->close();

echo($outp);
?>