<?php
include('mysql-login.php');

$dbconnect = mysql_connect($host, $db_user, $db_password);
mysql_select_db($database);

$query = "SELECT COUNT(*) Total FROM paints";
$result = mysql_query($query, $dbconnect);

$row = mysql_fetch_array($result);
$total = $row['Total'];

echo "<h1> Total Products: $total </h1>";

?>