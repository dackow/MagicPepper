<?php
  include "functions/gzip.php";
	//url = $_GET["url"];
    $url = 'https://calendar.google.com/calendar/ical/waldemar.dacko%40gmail.com/private-0f049086873b5cce261a62ca04387b44/basic.ics';
	echo get_url($url);
?>
