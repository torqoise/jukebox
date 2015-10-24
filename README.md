# Jukebox (In development)
A simple HTML5 jukebox web app that plays all music files that a specific web browser supports.

## Indev status
Almost complete. I just need to work on the upload page and no files in directory things.

It's basically an &lt;audio&gt; tag but instead of using it by having the browser's controls, you use it by clicking the jukebox graphic and the buttons underneath.

It's currently in development and I'm going to continue working on it until the wishlist below has emptied out.

Current features
* File discovery
* Graying out the jukebox (using the filter property)
* Playlist
* Speech control (that would be useful for TVs configurations)

Important feature wishlist
* Upload page (being worked on)
* A message for an empty directory

Less important feature wishlist
* Animation for the jukebox
* Graying out the jukebox (using the SVG filter method)

## Requirements
A Web Server with PHP 5 support, read/write access to the folder that you want to store the program, and having sure that uploading files is enabled in `php.ini`.
