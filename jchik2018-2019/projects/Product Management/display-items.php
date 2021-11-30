<?php
include('mysql-login.php');

$dbconnect = mysql_connect($host, $db_user, $db_password);
mysql_select_db($database);

$query = "SELECT * FROM paints";
$result = mysql_query($query, $dbconnect); 

echo "<table>";
echo "<tr>";
echo "<th> PRODUCT </th>";
echo "<th> ID </th>";
echo "<th> NAME </th>";
echo "<th> PRICE </th>";
echo "<th> QUANTITY </th>";
echo "</tr>";

while ($row = mysql_fetch_array($result)) {
	echo "<tr>";
	echo "<td class='image'> <img src='$row[image]'/> </td>";
	echo "<td> " . str_pad($row['id'], 6, "0", STR_PAD_LEFT) . " </td>";
	echo "<td> $row[name] </td>";
	echo "<td> $$row[price] </td>";
	echo "<td> $row[quantity] </td>";
	echo "</tr>";
}

echo "</table>";

?>