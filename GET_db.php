<?php
    $host = "211.169.215.170:6004"; //139.150.80.81
    $user = "soltmds";//enviot
    $pw = "09!b72^ea2ea9&04b66";//env194^9*
    $dbName = "tmds";//lock_iot

    $conn = new mysqli($host, $user, $pw, $dbName); 

    $now_date = date("Y-m-d");
    $result_array=array();

    /* 
        9호기 module_idx = 8 
       10호기 module_idx = 14  
       11호기 module_idx = 19 
    */  
    $m_IDX = $_POST['m_IDX'];

    /* DB 연결 확인 */
    if($conn){ 
        /* SELECT 예제 */
        $sql = "SELECT idx, module_idx, pressure, torque, inclination_x, inclination_y, max_depth, beat_position, collecttime  
        FROM raw_yjsensing WHERE module_idx=${m_IDX} AND collecttime BETWEEN '${now_date} 00:00:00' 
        AND '${now_date} 23:59:59' AND MOD(idx, 1000)=0 ORDER BY collecttime ASC;"; 
        if ($result = mysqli_query($conn, $sql)) {
            while($row=mysqli_fetch_array($result)){
                array_push($result_array,array("result" => 'success',"Error" => 'None',"idx" => $row["idx"],
                "module_idx" => $row["module_idx"],"pressure" => $row["pressure"],"torque" => $row["torque"],
                "inclination_x" => $row["inclination_x"],"inclination_y" => $row["inclination_y"],
                "max_depth" => $row["max_depth"],"collecttime" => $row["collecttime"],"beat_position" => $row["beat_position"]));
            }
            $msg = json_encode($result_array);
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