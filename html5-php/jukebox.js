var jukeboxVal = false; // Set the default value of the enabler to off
var jukeboxSongNo = 0;  // Default song number, so we don't break things
var jukeboxSongLc;      // Same with this, it's just we don't need to put in any values

// When the Jukebox is clicked or tapped
function jukeboxClick() {
	var jukeboxAudio = document.getElementById("jukeboxEngine");
	// Make sure a song HAS been chosen on
	if (jukeboxVal == true) {
		// If it is, if the audio is paused 
		if (jukeboxAudio.paused && !jukeboxAudio.ended) {
			// Then play
			jukeboxAction("play");
		} else {
			// Otherwise pause the audio
			jukeboxAction("pause");
		}
	} else {
		// Otherwise just point them to the song list
		window.location.href = "#musiclist";
	}
}

// A function for playing, pausing, resetting, stopping and seeking.
function jukeboxAction(action) {
	var jukeboxAudio = document.getElementById("jukeboxEngine");
	var jukeboxControl = document.getElementById("jukebox");

	// Test each possible attribute
	if (action == "play") {
		jukeboxAudio.play();                             // Play the audio
		jukeboxControl.setAttribute("class", "jukebox"); // Remove the grey filter
	} else { // My text editor doesn't do synthax highlighting for elseif... So I opted into using a bunch of elses.
		if (action == "pause") {
			jukeboxAudio.pause();                                 // Pause the audio
			jukeboxControl.setAttribute("class", "jukebox grey"); // Enable the grey filter
		} else {
			if (action == "stop") {
				jukeboxAction("pause");       // Call the pause function
				jukeboxAudio.currentTime = 0; // Set the current time to 0
			} else {
				if (action == "restart") {
					jukeboxAction("stop"); // Call the stop function
					jukeboxAction("play"); // Start playing
				} else {
					if (action == "10back") {
						jukeboxAudio.currentTime = jukeboxAudio.currentTime - 10; // Go backwards 10 seconds in the song
					} else {
						if (action == "10forward") {
							jukeboxAudio.currentTime = jukeboxAudio.currentTime + 10; // Go forwards 10 seconds in the song
						}
					}
				}
			}
		}
	}
}

// A function for quickly changing the file in the song
function chooseFile(songnom) {
	var jukeboxAudio = document.getElementById("jukeboxEngine"); // Import the jukeboxEngine
	jukeboxAction("stop");                                       // Stop the previous song

	// Old method of replacing the previous file with the new one.
	// jukeboxAudio.setAttribute("src", audiofile);

	// New method which uses the song ID method
	jukeboxAudio.setAttribute("src", songNo2songLc(songnom));    // Ask no2lc for the location and change the song

	jukeboxVal = true;                                           // Overwrite the enabler variable to allow playing of songs
	jukeboxAction("play");                                       // Play the new song
}

// A function for converting a song number into a song location
function songNo2songLc(songnom) {
	var tableBase = document.getElementsByTagName("tr")[songnom]; // Select the table database
	var songLc = tableBase.getAttribute("file");                  // Get the filename
	return songLc;												  // Return it
}

// jQuery things
$(function(){
	// If there is another song in the list, switch to that song (autoplay)
	$("#jukeboxEngine").bind("ended", function(){
		jukeboxSongNo += 1;        // Add one to the previous song number
		chooseFile(jukeboxSongNo); // Choose a new file
	});
});

// Voice Recognition - for the cool kids
if (annyang) {
	
	// Add a bunch of commands
	var jukeboxVoice = {

		// Main media player commands
		'play (me the song)': function() {
			if (jukeboxVal = true) {
				jukeboxAction("play");
			} else {
				alert("You need to choose a song before playing it...");
				window.location.href = "#musiclist";
			}
		},
		'stop (the song)': function() {
			jukeboxAction("stop");
		},
		'pause (the song)': function() {
			jukeboxAction("pause");
		},
		'seek (the song) (forward) 10 seconds': function() {
			jukeboxAction("10forward");
		},
		'seek (the song) back 10 seconds': function() {
			jukeboxAction("10back");
		},
		'play song number *nom': function(nom) {
			alert("You gave number " + nom + ". If you were expecting something else, YOU WERE WRONG!!!");
		},

		// Announcing that there are no APIs available for EDAs
		'hey siri': function() {
			alert("Jukebox does not support any external digital assistents (e.g. Cortana or Siri) at the moment... Try again after future updates.");
		},
		'hey cortana': function() {
			alert("Jukebox does not support any external digital assistents (e.g. Cortana or Siri) at the moment... Try again after future updates.");
		},
		'hey google (now)': function() {
			alert("Jukebox does not support any external digital assistents (e.g. Cortana or Siri) at the moment... Try again after future updates.");
		},

		// Go to other pages
		'tell me more about you': function(nom) {
			window.location.href = "about.php";
		},
		'i want to upload a song': function(nom) {
			window.location.href = "upload.php";
		}
	};

	// Add the commands and start the Voice Recognition program
	annyang.addCommands(jukeboxVoice);
	annyang.start();
}