<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="assign2.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script type="text/javascript" src="add-validate.js"></script>
		<title> ADD </title>
	</head>
		
	<body>
		<header>
			<div class="wrapper">
				<div id="companyName"> 
					PORO PAINTS
				</div>
				<div id="logo"> 
					<img id="icon" src="images/poro.png" alt="poro"/> 
				</div>
			</div>
		</header>
		
		<nav>
			<div id="navWrapper">
				<ul>
					<li> <a href="home.html"> HOME </a> </li>
					<li> <a href="display.php"> DISPLAY </a> </li>
					<li> <a href="add.php"> ADD </a> </li>
					<li> <a href="delete.php"> DELETE </a> </li>
					<li> <a href="contact.html"> CONTACTS </a> </li>
					<li> <a href="media.html"> MEDIA </a> </li>
				</ul>
				<div class="social">
					<a href="https://www.facebook.com"> <i class="fa fa-facebook-square" style="font-size:24px"></i> </a>
					<a href="https://www.instagram.com"> <i class="fa fa-instagram" style="font-size:24px"></i> </a>
					<a href="https://www.twitter.com"> <i class="fa fa-twitter" style="font-size:24px"></i> </a>
					<a href="https://www.twitch.tv"> <i class="fa fa-twitch" style="font-size:24px"></i> </a>
				</div>
			</div>
		</nav>
		
		<section>
			<div class="infobar">
				<h1> ADD A PRODUCT </h1> 
				<span id="addMessageBox" class="messageBox"> 
					<?php 
						if (isset($_POST['addSubmit'])) {
							include ('add-item.php');
						}	
					?>
				</span>
				<span class="totalCount">
					<?php 
						include ('item-count.php');
					?>
				</span>
			</div>
			<div class="forms">
				<form id="addForm" action="" name="addForm" method="post">
					ID <input id="addID" type="text" name="addID" placeholder="6 Digit #, Eg. 000000"/>
					Name <input id="addName" type="text" name="addName" placeholder="Max 25 characters"/>
					Price <input id="addPrice" type="text" name="addPrice" placeholder="Eg. 0.00"/>
					Quantity <input id="addQuantity" type="text" name="addQuantity" placeholder="Eg. 0"/>		
					<input id="addSubmit" type="submit" name="addSubmit" value="Add Product" onClick="return checkSubmit()"/>
				</form>				
			</div>
			<div class="display">
				<?php
					include('display-items.php');
				?>
			</div>
		</section>
		
		<footer>
			meow
		</footer>
	</body>
</html>