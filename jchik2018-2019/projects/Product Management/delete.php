<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="assign2.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- <script type="text/javascript" src=".js"></script> -->
		<title> DELETE </title>
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
				<h1> DELETE A PRODUCT </h1>
				<span class="messageBox"> 
					<?php 
						if (isset($_POST['deleteSubmit'])) {
							include ('delete-item.php');
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
				<form id="deleteForm" action="" name="deleteForm" method="post">
					Enter ID to delete <input id="deleteID" type="text" name="deleteID" placeholder="6 Digit #, Eg. 000000"/> 
					<input id="deleteSubmit" type="submit" name="deleteSubmit" value="Delete"/>
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