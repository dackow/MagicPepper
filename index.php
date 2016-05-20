<html>
<head>
	<title>Magic Mirror</title>
	<style type="text/css">
		<?php include('css/main.css') ?>
	</style>
	<link rel="stylesheet" type="text/css" href="css/weather-icons.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<script type="text/javascript">
		var gitHash = '<?php echo trim(`git rev-parse HEAD`) ?>';

	</script>

	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>
<body>
	<!--<div class="lastsync top smallest center-hor" id="lastsync">sss</div>-->
	<div class="top right"><div class="time" id="time"></div><div class="date small dimmed"></div><br /><div class="windsun small dimmed"></div><div class="temp"></div><div class="forecast small dimmed"></div></div>
	<!--<div class="top left">
		<div class="time" id="time"></div>
		<div class="date small dimmed"></div>
		<!--<div class="nameday smallest" id="nameday"></div>-->
	<br />

    <div class="xxsmall pepper" id="pepper"></div></div>
    
	<div class="center-ver center-hor">
	<!--<div class="dishwasher light">Vaatwasser is klaar!</div>   -->
<!--<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=waldemar.dacko%40gmail.com&amp;color=%232F6309&amp;ctz=Europe%2FWarsaw" style="border-width:0" width="600" height="300" frameborder="0" scrolling="no"></iframe>
 -->
   	

	</div>
	
	<!--<div class="lower-third center-hor"><div class="compliment light"></div></div>-->
	<!--<div class="bottom center-hor"><div class="news medium"></div></div>-->
	<!--<div class="lastsync bottom center-hor smallest"><hr />--Pobieranie danych. Proszę czekać.--<div class="lastsync"></div></div>-->
	<div class="gmail bottom center-hor smallest" id="gmail"></div>
	<button id="authorize-button" class="btn btn-primary hidden">Authorize</button>

</div>




<script src="js/jquery.js"></script>
<script src="js/jquery.feedToJSON.js"></script>
<script src="js/ical_parser.js"></script>
<script src="js/moment-with-locales.min.js"></script>
<script src="js/config.js"></script>
<script src="js/rrule.js"></script>
<script src="js/version/version.js"></script>
<script src="js/calendar/calendar.js"></script>
<script src="js/compliments/compliments.js"></script>  
<script src="js/weather/weather.js"></script>
<script src="js/time/time.js"></script>
<script src="js/news/news.js"></script>
<script src="js/pepper/pepper.js"></script>
<script src="js/gapi_client.js"></script>
<script src="js/gmail/gmail.js"></script>
<script src="js/main.js?nocache=<?php echo md5(microtime()) ?>"></script>




<!-- <script src="js/socket.io.min.js"></script> -->
<?php  include(dirname(__FILE__).'/controllers/modules.php');?>
</body>
</html>
