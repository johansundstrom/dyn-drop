<?php

    include_once("../wp/wp-config.php");
    include_once("../wp/wp-includes/wp-db.php");

    $postdata = json_decode(stripslashes($_POST['arr']), true);
 
    $table = 'mma_inventory';
    $data = $postdata[0];
    $format = array('%s', '%s', '%d', '%s', '%d');
    $result_check = $wpdb->insert($table, $data, $format);
    
    if($result_check){
        foreach($data as $key => $value){
            echo $key . ": '" . $value . "'\n";
        }
        //debug
        //echo "executed: " . $wpdb->last_query;
     } else {
        echo "insert err";
     }
    
    //debug
    //echo $wpdb->last_query;

?>
