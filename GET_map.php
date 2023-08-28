<?php
    $host = "211.169.215.170:6004"; //139.150.80.81
    $user = "soltmds";//enviot
    $pw = "09!b72^ea2ea9&04b66";//env194^9*
    $dbName = "tmds";//lock_iot

    $result_array=array();
    $conn = new mysqli($host, $user, $pw, $dbName); 
    mysqli_set_charset($conn, "utf8");

    if($conn) {
        $sql = "SELECT work_name, work_address, work_lat, work_lng FROM mgt_work";
        if($result = mysqli_query($conn, $sql)) {
            while($row=mysqli_fetch_array($result)){
                array_push($result_array,array(
                    "result" => 'success',
                    "Error" => 'none',
                    "work_name" => $row["work_name"],
                    "work_address" => $row["work_address"],
                    "work_lat" => $row["work_lat"],
                    "work_lng" => $row["work_lng"]));
            }
            $msg = json_encode($result_array);
        } else {
            $msg = json_encode(array("result" => 'fail', "Error" =>  mysqli_error($conn)));
        }
    } else {
        $msg = json_encode(array("result" => 'fail', "Error" => 'Could not connect'), JSON_UNESCAPED_UNICODE);
    }
    echo $msg;
    mysqli_close($conn);
    exit;
?>