<?php
    $host = "211.169.215.170:6004"; //139.150.80.81
    $user = "soltmds";//enviot
    $pw = "09!b72^ea2ea9&04b66";//env194^9*
    $dbName = "tmds";//lock_iot

    $conn = new mysqli($host, $user, $pw, $dbName); 

    /* DB 연결 확인 */
    if($conn){ 
        /* SELECT 예제 */
        $sql = "SELECT * FROM raw_yjsensing ORDER BY collecttime DESC LIMIT 1;"; 
        if ($result = mysqli_query($conn, $sql)) {
            $row = mysqli_fetch_array($result);
            $msg = json_encode(array("result" => 'success',"Error" => 'None',"idx" => $row["idx"],"module_idx" => $row["module_idx"],"work_unit_idx" => $row["work_unit_idx"],"pressure" => $row["pressure"],"torque" => $row["torque"],"inclination_x" => $row["inclination_x"],"inclination_y" => $row["inclination_y"],"rod_count" => $row["rod_count"],"max_depth" => $row["max_depth"],"beat_position" => $row["beat_position"],"switch" => $row["switch"],"collecttime" => $row["collecttime"]));
        } else {
            $msg = json_encode(array("result" => 'fail', "Error" =>  mysqli_error($conn)));
        } 
    }else{
        $msg = json_encode(array("result" => 'fail', "Error" => 'Could not connect'));
    }
    echo $msg;
    mysqli_close($conn);
    exit;
?>