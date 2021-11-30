<?php
include('mysql-login.php');

$dbconnect = mysql_connect($host, $db_user, $db_password);
mysql_select_db($database);

$id = $_POST['addID'];
$name = $_POST['addName'];
$price = $_POST['addPrice'];
$quantity = $_POST['addQuantity'];

$query = "SELECT * FROM paints WHERE id='$id'";
$result = mysql_query($query, $dbconnect);

if (mysql_fetch_array($result)) {
	echo "ID already exists";
}
else {
	$query = "INSERT INTO paints VALUES ('$id', '$name', '$price', '$quantity', default)";
	mysql_query($query);
	echo "Product successfully added";
}

?>