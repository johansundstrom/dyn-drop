<?php
    header('Access-Control-Allow-Origin: *');

    include_once("../wp/wp-config.php");
    include_once("../wp/wp-includes/wp-db.php");

    $sql = "SELECT * FROM mma_model";
    $posts = $wpdb->get_results($sql);
    $sql = "SELECT * FROM mma_cathegory";
    $cath = $wpdb->get_results($sql);

    /*
    echo "<table border='1'>";
    foreach ( $posts as $post ) { 
        echo "<tr><td>" . $post->brand . "</td><td>" . $post->model . "</td><td>" . $post->year . "</td></tr>";
    }
    echo "<table>";
    */


    /*
        $data = json_decode(stripslashes($_POST['arr']));
        var_dump($_POST);
        $myBrand = $data['brand'];
        $myModel = $data['model'];
        $myYear = $data['year'];
        $myCath = $data['cath'];
        $myState = $data['state'];

        echo $myBrand;
    */

    /*
    foreach($data as $item){
        echo $item;
        // insert to db
     }
     */
   
?>

<!doctype html>
<html lang="en">
    <head>
        <title>Register thing for sale</title>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />

        <!-- Bootstrap CSS -->
        <!--link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <!--script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script-->
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="myStyles.css">

        
    </head>
    
    <body>
        <br>
        <div class="container" style="max-width: 500px;;">
            <form id="myForm" action="">
                <select class="form-control mb-1" id="brandList" onchange="brandChanged()"></select>
                <select class="form-control mb-1" id="modelList" onchange="modelChanged()"></select>
                <select class="form-control mb-1" id="yearList" onchange="yearChanged()"></select>
                <select class="form-control mb-1" id="cathList" onchange="cathChanged()"></select>
                
                <div class="container">
                    <div class="row">
                        <div class="col-sm pr-0 pl-0"><input id="stateSlider" class="slider" type="range" min="1" max="5" step="1" value="3" /></span></div>
                        <div class="col-sm p-3">
                            <span id="stateOutput"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Price</span>
                    </div>
                    <input type="number" id="currencyText" class="form-control" onkeyup="price()" aria-label="Pris">
                    <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                        <span class="input-group-text">SEK</span>
                    </div>
                  </div>
               
            </form>
            <button type="button" id="sendButton" class="btn">Lägg till</button>
        </div>

        <script>
            var arrAll = <?php echo json_encode($posts); ?>;
            var arrCath = <?php echo json_encode($cath); ?>;
        </script>

        <!-- private js-->
        <script src="myjs.js"></script>
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <!--script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.3.3/cjs/popper.min.js" integrity="sha256-SZAAW0gKAx1QbwIZt+3dTV3JSvyIHmnxA8semqGwJf0=" crossorigin="anonymous"></script-->
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>
