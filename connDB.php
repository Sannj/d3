<?php
/**
 * Created by PhpStorm.
 * User: sanjanabadam
 * Date: 9/13/16
 * Time: 11:17 AM
 */


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM finance_data";
$result = $conn->query($sql);

$json_string = "[";
$json_string_array = [];
$i = 0;

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //    echo "Population : " . $row["population"]. " - Country Name : " . $row["country_name"] . "<br>";
        $json_string_array[$i] = "{\"Q1\":"."\"".$row['Q1']."\",\"Q2\":\"".$row['Q2']."\","."\"Q3\":\"".$row['Q3']."\","."\"Q4\":\"".$row['Q4']."\"}";
        $i++;
    }
} else {
    echo "{'message': '0 results'}";
}
$json_string.= implode(',', $json_string_array);
//$output = json_encode();
//echo $output;
$json_string .= "]";
echo $json_string;