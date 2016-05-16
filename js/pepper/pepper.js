// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed-to-json/
var pepper = {
	feed: config.pepper.feed || null,
	feeds: config.pepper.feeds || null,
	newsLocation: '.pepper',
	syncLocation: '.lastsync',
	newsItems: [],
	seenNewsItem: [],
	currentFeed: null,
	_yqURL: 'https://query.yahooapis.com/v1/public/yql',
	_yqlQS: '?format=json&q=select%20*%20from%20rss%20where%20url%3D',
	_cacheBuster: Math.floor((new Date().getTime()) / 1200 / 1000),
	_failedAttempts: 0,
	fetchInterval: config.pepper.fetchInterval || 60000,
	updateInterval: config.pepper.interval || 5500,
	fadeInterval: 0,
	intervalId: null,
	fetchNewsIntervalId: null,
	counter: 0,
	maxLineLength: 125,
}

/**
 * Creates the query string that will be used to grab a converted RSS feed into a JSON object via Yahoo
 * @param  {string} feed The original location of the RSS feed
 * @return {string}      The new location of the RSS feed provided by Yahoo
 */
pepper.buildQueryString = function (feed) {

	return this._yqURL + this._yqlQS + '\'' + encodeURIComponent(feed) + '\'';

}

/**
 * Fetches the news for each feed provided in the config file
 */
pepper.fetchNews = function () {

	// Reset the news feed
	this.newsItems = [];

	this.feed.forEach(function (_curr) {

		var _yqUrlString = this.buildQueryString(_curr);
		this.fetchFeed(_yqUrlString);

	}.bind(this));
}

pepper.fetchAndShowSingleFeed = function (feed){
	this.currentFeed = feed;
	// Reset the news feed
	this.newsItems = [];

	var _yqUrlString = this.buildQueryString(feed);
	this.fetchFeed(_yqUrlString);
}

/**
 * Runs a GET request to Yahoo's service
 * @param  {string} yqUrl The URL being used to grab the RSS feed (in JSON format)
 */
pepper.fetchFeed = function (yqUrl) {

	$.ajax({
		type: 'GET',
		datatype:'jsonp',
		url: yqUrl,
		success: function (data) {

			if (data.query.count > 0) {
				this.parseFeed(data.query.results.item);
			} else {
				console.error('No feed results for: ' + yqUrl);
			}

		}.bind(this),
		error: function () {
			// non-specific error message that should be updated
			console.error('No feed results for: ' + yqUrl);
		}
	});

}

/**
 * Parses each item in a single news feed
 * @param  {Object} data The news feed that was returned by Yahoo
 * @return {boolean}      Confirms that the feed was parsed correctly
 */
pepper.parseFeed = function (data) {

	var _rssItems = [];

	for (var i = 0, count = data.length; i < count; i++) {

		if(data[i].title.length > this.maxLineLength){
			var sub = data[i].title.substring(0,this.maxLineLength);
            var lastSpaceIndex = sub.lastIndexOf(" ");
            if(lastSpaceIndex !== -1){
            	sub = sub.substring(0, lastSpaceIndex) + "...";
            }
			_rssItems.push(sub);
		}else{	
			_rssItems.push(data[i].title);
		}	

	}

	this.newsItems = this.newsItems.concat(_rssItems);
    this.showNews();
	return true;

}

/**
 * Loops through each available and unseen news feed after it has been retrieved from Yahoo and shows it on the screen
 * When all news titles have been exhausted, the list resets and randomly chooses from the original set of items
 * @return {boolean} Confirms that there is a list of news items to loop through and that one has been shown on the screen
 */
pepper.showNews = function () {

	// If all items have been seen, swap seen to unseen
	if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {

		if (this._failedAttempts === 20) {
			console.error('Failed to show a news story from pepper 20 times, stopping any attempts');
			return false;
		}

		this._failedAttempts++;

		setTimeout(function () {
			this.showNews();
		}.bind(this), 3000);

	} else if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {
		this.newsItems = this.seenNewsItem.splice(0);
	}

	text = this.newsItems.join("<br />");
	$(this.newsLocation).updateWithText(text, this.fadeInterval);
/*
	var currTime = new Date();
	hour = currTime.getHours();
	if(hour < 10){
		hour = "0" + hour;
	}
	min = currTime.getMinutes();
	if(min < 10){
		min = "0" + min;
	}
	sec = currTime.getSeconds();
	if(sec < 10){
		sec = "0" + sec;
	}

	var syncDate = hour + ":" + min + ":" + sec;
*/
	$(this.syncLocation).updateWithText( "<hr />" + this.currentFeed , 0);
	this.counter = this.counter + 1;

	return true;

}

pepper.init = function () {

	//this.do_standalone();
	if (this.feed === null || (this.feed instanceof Array === false && typeof this.feed !== 'string')) {
		return false;
	} else if (typeof this.feed === 'string') {
		this.feed = [this.feed];
	}

	//this.fetchNews();
	//this.showNews();
	
/*
	this.fetchNewsIntervalId = setInterval(function () {
		this.fetchNews()
	}.bind(this), this.fetchInterval)

	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);
*/
	//var fetchIndex = 1;
	

	//this.fetchSingleNews(this.feeds[fetchIndex]);
	//this.showNews();
	var fetchIndex = 0;
	setInterval(function(){		
		this.fetchAndShowSingleFeed(this.feeds[fetchIndex]);
		if(fetchIndex === this.feeds.length-1){
			fetchIndex = 0;			
		}else{
			fetchIndex = fetchIndex + 1;
		}
	}.bind(this), this.fetchInterval);
/*
	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);
	*/
}
