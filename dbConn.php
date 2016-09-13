<?php
/**
 * Created by PhpStorm.
 * User: sanjanabadam
 * Date: 9/11/16
 * Time: 7:56 PM
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

$sql = "SELECT * FROM test_table";
$result = $conn->query($sql);

$json_string = "{";
$json_string_array = [];
$i = 0;
/*
$emparray = array();
while($row =mysqli_fetch_assoc($result))
{
    $emparray[] = $row;
}
$conn->close();
echo json_encode($emparray,JSON_PRETTY_PRINT);
*/

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //    echo "Population : " . $row["population"]. " - Country Name : " . $row["country_name"] . "<br>";
        $json_string_array[$i] = "\"".$row['country_name']."\":\"".$row['population']."\"";
        $i++;
    }
} else {
    echo "{'message': '0 results'}";
}
$json_string.= implode(',', $json_string_array);
//$output = json_encode();
//echo $output;
$json_string .= "}";
echo $json_string;

?>