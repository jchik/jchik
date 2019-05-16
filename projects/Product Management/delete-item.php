<?php
include('mysql-login.php');

function checkInput($input) {
	if ($input == "" || $input == null) {
		echo "Please fill out the form";
		return false;
	}
	
	if (!is_numeric($input)) {
		 echo "Please enter a number";
		return false;
	}
	
	if (ereg("^[0-9]+[.][0-9]+$", $input)) {
		echo "Please enter integers only";
		return false;
	}
	
	if ($input < 0) {
		echo "Please enter positive integers";
		return false;
	}
		
	return true;
}

$dbconnect = mysql_connect($host, $db_user, $db_password);
mysql_select_db($database);

$id = $_POST['deleteID'];

if(checkInput($id)) {
	$query = "SELECT * FROM paints WHERE id='$id'";
	$result = mysql_query($query, $dbconnect); 

	if (mysql_fetch_array($result)) {
		$query = "DELETE FROM paints WHERE id='$id'";
		mysql_query($query);
		echo "Product successfully deleted";
	}
	else {
		echo "ID not found";
	}
}

?>