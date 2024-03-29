<?php
    $host = ""; 
    $user = "";
    $pw = "";
    $dbName = "";

    $conn = new mysqli($host, $user, $pw, $dbName); 

    $now_date = date("Y-m-d");

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
        FROM raw_yjsensing where module_idx=${m_IDX} ORDER BY collecttime DESC LIMIT 1;"; 
        if ($result = mysqli_query($conn, $sql)) {
            $row = mysqli_fetch_array($result);
            $msg = json_encode(array(
                "result" => 'success',
                "Error" => 'None',
                "idx" => $row["idx"],
                "module_idx" => $row["module_idx"],
                "pressure" => $row["pressure"],
                "torque" => $row["torque"],
                "inclination_x" => $row["inclination_x"],
                "inclination_y" => $row["inclination_y"],
                "max_depth" => $row["max_depth"],
                "collecttime" => $row["collecttime"],
                "beat_position" => $row["beat_position"]
            ));
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