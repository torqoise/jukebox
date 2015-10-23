<!DOCTYPE html>
<html>
<head>
	<!-- Title -->
	<title>Jukebox</title>

	<!-- Enabling responsive design -->
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Stylesheet and Font Awesome -->
	<link rel="stylesheet" type="text/css" href="theme.css">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">

	<!-- Jukebox, jQuery and Annyang JavaScript libraries -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.0.0/annyang.min.js"></script>
	<script type="text/javascript" src="//code.jquery.com/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="jukebox.js"></script>

	<!--
		NOTES

		All links are supposed to link to the top of the page.
		-->
</head>
<body>
	<!-- HTML5 audio player. Can be shown by appending #jukeboxEngine at the end of the url -->
	<audio id="jukeboxEngine" controls></audio>

	<!-- The jukebox graphic with clickability -->
	<div class="jukebox grey" id="jukebox">
		<a onclick="jukeboxClick()" title="Click or tap me to pause/play the selected song"><img src="jukebox.svg"></a>
	</div>

	<!-- Jukebox control bar -->
	<div class="jukeboxctl">
		<a href="#" onclick="jukeboxAction('10back')" title="10 seconds backwards" id="button"><i class="fa fa-backward"></i></a><a href="#" onclick="jukeboxAction('restart')" title="Stop and Play again" id="button"><i class="fa fa-step-backward"></i></a><a href="#" onclick="jukeboxAction('stop')" title="Stop" id="button"><i class="fa fa-stop"></i></a><a href="#" onclick="jukeboxAction('10forward')" title="10 seconds forwards" id="button"><i class="fa fa-forward"></i></a> <a href="upload.php" title="Upload songs"><i class="fa fa-upload"></i></a><a href="about.php" title="About Jukebox"><i class="fa fa-info"></i></a>
	</div>

	<!-- The music list -->
	<div id="musiclist">
		<div class="header"><div class="widfix">Song List</div></div>
		<div class="widfix">
			<table>
			<?php

			$tablecount = 0;             // Set the default table count variable
			$handle = opendir('music/'); // Open a handle for reading the directory

			if ($handle) {
				while (false !== ($file = readdir($handle))) {

					if (($file !== ".") and ($file !== "..")) { // Remove a directory aliases
						// $data = "'music/".$file."'"; // Obsolete code
						$quotlessdata = "music/".$file;

						// Print the tablecount
						print '<tr tablecount="'.$tablecount.'" file="'.$quotlessdata.'"><td><a href="#"  onclick="chooseFile(' .$tablecount. ')" id="songbtn">' . $file . '</a></td></tr>';
						$tablecount += 1; // Add 1 to tablecount so it makes it easier for us to write the JavaScript autoplay code
					}
				}
				closedir($handle); // Close handle
			} ?>
			</table>
		</div>
	</div>
</body>
</html>