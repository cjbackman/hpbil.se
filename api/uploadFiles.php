<?php

$config = include('config.php');
$errors = array();
$uploadedFiles = array();
$extension = array("jpeg","jpg","png","gif");
$bytes = 1024;
$KB =  10240;
$totalBytes = $bytes * $KB;
$UploadFolder =  $config['upload_dir'];
 
$counter = 0;
 
foreach($_FILES["photo"]["tmp_name"] as $key=>$tmp_name){
    $temp = $_FILES["photo"]["tmp_name"][$key];
    $name =  $_FILES["photo"]["name"][$key];
     
    if(empty($temp))
    {
        break;
    }
     
    $counter++;
    $UploadOk = true;
     
    if($_FILES["photo"]["size"][$key] > $totalBytes)
    {
        $UploadOk = false;
        array_push($errors, $name." file size is larger than the 10 MB.");
    }
     
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    if(in_array($ext, $extension) == false){
        $UploadOk = false;
        array_push($errors, $name." is invalid file type.");
    }
     
    if(file_exists($UploadFolder."/".$name) == true){
        $unique = false;
        while (!$unique) {
            $n = rand();
            $namepart = explode(".", $name);
            $tmp = $namepart[0]."_".$n.".".$namepart[1];
            if (!file_exists($UploadFolder."/".$tmp)) {
                $unique = true;
                $name = $tmp;
            }
        }
    }
     
    if($UploadOk == true){
        if(move_uploaded_file($temp,$UploadFolder."/".$name)) {
            array_push($uploadedFiles, $name);
        }
        else {
            array_push($errors, $name." could not be moved to its destination.");
        }
    }
}
 
if($counter>0){
    if(count($errors)>0)
    {
        echo json_encode($errors);
    }
     
    if(count($uploadedFiles)>0)
    {
        echo json_encode($uploadedFiles);
    }                               
}
?>